import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import ColorAccent from "../../constant/Color.js";
import { s, ScaledSheet } from "react-native-size-matters";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPaidCourseById } from "../../hooks/Course/getPaidCourseById.js";
import { PaidLessonCard } from "../../components/Course/PaidLessonCard.jsx";
import { paymentIntent } from "../../hooks/Order/paymentIntent.js";
import { useStripe } from "@stripe/stripe-react-native";
import { errorToast, successToast } from "../../utils/toastConfig.js";
import { createOrder } from "../../hooks/Order/createOrder.js";
import { getReviewByCourse } from "../../hooks/Review/getReviewByCourse.js";
import { ReviewCard } from "../../components/Course/ReviewCard.jsx";
import TextAreaInput from "../../components/Input/TextAreaInput.jsx";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { createReview } from "../../hooks/Review/createReview.js";
import Stars from "../../components/Course/Stars.jsx";
import { useNavigation } from "@react-navigation/native";
import startPaidUserCourse from "../../hooks/UserCourse/startPaidUserCourse.js";
import updatePaidUserCourse from "../../hooks/UserCourse/updatePaidUserCourse.js";

export const PaidCourseDetails = (props) => {
  const queryClient = useQueryClient();
  const { course } = props.route.params;
  const [show, setShow] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [alredyReview, setAlredyReview] = useState(false);
  const user = userStore((state) => state.user);
  const token = userStore((state) => state.token);
  const [starRating, setStarRating] = useState(0);
  const [lessonPass, setLessonPass] = useState(0);
  const navigation = useNavigation();

  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const courseId = course.id;
  const paidCourse = useQuery({
    queryKey: ["paidCourse", token, courseId],
    queryFn: () => getPaidCourseById(token, courseId),
    enabled: !!token,
  });

  const courseReview = useQuery({
    queryKey: ["courseReview", token, courseId],
    queryFn: () => getReviewByCourse(token, courseId),
    enabled: !!token,
  });

  const createReviewMutation = useMutation({
    mutationFn: createReview,
    onSuccess: async () => {
      successToast("Review notification", "Create review successfully");
      queryClient.invalidateQueries(["courseReview", token, courseId]);
    },
  });

  const createPaymentIntent = useMutation({
    mutationFn: paymentIntent,
    onSuccess: async (data) => {
      await handleReturnPaymentIntent(data);
      queryClient.invalidateQueries(["paidCourse", token, courseId], {
        refetchActive: true,
      });
    },
  });

  const createOrderMutation = useMutation({
    mutationFn: createOrder,
    onSuccess: async (data) => {
      successToast("Order notification", "Create payment successfully");
      const orderId = data.data.id;
      createPaymentIntent.mutate({ user, token, course, orderId });
    },
  });

  const finishedCourseMutation = useMutation({
    mutationFn: updatePaidUserCourse,
    onSuccess: () => {
      successToast("Course notification", "You have finished this course 🤩");
      queryClient.invalidateQueries(["paidCourse", token, courseId], {
        refetchActive: true,
      });
    },
  });

  const startCourseMutation = useMutation({
    mutationFn: startPaidUserCourse,
    onSuccess: () => {
      successToast("Course notification", "You have started this course 👏🏻");
      queryClient.invalidateQueries(["paidCourse", token, courseId], {
        refetchActive: true,
      });
    },
  });

  const handleCreateReview = async () => {
    createReviewMutation.mutate({
      user,
      token,
      course,
      reviewText,
      starRating,
    });
    setAlredyReview(true);
  };

  const handleCreateOrder = async () => {
    createOrderMutation.mutate({ user, token, course });
  };

  const handleReturnPaymentIntent = async (data) => {
    const initResponse = await initPaymentSheet({
      paymentIntentClientSecret: data.paymentIntent,
      merchantDisplayName: "Merchant Name",
    });

    if (initResponse.error) {
      console.log(initResponse.error);
      errorToast(initResponse.error.message);
      return;
    }

    const paymentResponse = await presentPaymentSheet();

    if (paymentResponse.error) {
      successToast("Order notification", paymentResponse.error.message);
      return;
    }
  };

  const handleStartCourse = async () => {
    startCourseMutation.mutate({ user, courseId, token });
  };

  const handleFinishedCourse = async () => {
    const status = 2;
    finishedCourseMutation.mutate({ user, courseId, status, token });
  };

  useEffect(() => {
    if (courseReview.isSuccess && courseReview.data) {
      const containsUserId = courseReview.data.data.some(
        (review) => review.userId === user.id
      );
      if (containsUserId) {
        setAlredyReview(true);
      }
    }
  }, [courseReview.status]);

  useEffect(() => {
    if (paidCourse.isSuccess && paidCourse.data) {
      const passedLessonsCount = paidCourse.data.result.userLesson.reduce(
        (count, obj) => {
          return obj.status == 1 ? count + 1 : count;
        },
        0
      );

      setLessonPass(passedLessonsCount);
    }
  }, [paidCourse]);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.courseNameContainer}>
          <Text style={styles.courseNameText}>{course.name}</Text>
        </View>
        {/* -------------- COURSE IMAGE SECTION -------------- */}
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: course.thumbnail }} />
        </View>

        {/* -------------- COURSE DESCRIPTION SECTION -------------- */}
        <View style={styles.courseDescriptionSection}>
          <Text style={styles.text} numberOfLines={!show ? 3 : null}>
            {course.description}
          </Text>
          <TouchableOpacity onPress={() => setShow(!show)}>
            <Text style={styles.showText}>
              {!show ? "Show more" : "Show less"}
            </Text>
          </TouchableOpacity>
        </View>
        {paidCourse.data && (
          <TouchableOpacity
            style={styles.coachImageNameContainer}
            onPress={() =>
              navigation.navigate("CoachDescription", {
                coachId: paidCourse.data.result.coach.id,
              })
            }
          >
            <View style={styles.avatarContainer}>
              <Image
                style={styles.avatar}
                source={
                  paidCourse.data.result.coach.avatar == null
                    ? require("../../assets/4043232_avatar_batman_comics_hero_icon.png")
                    : { uri: paidCourse.data.result.coach.avatar }
                }
              />
            </View>
            <Text style={styles.coachText}>
              {paidCourse.data.result.coach.firstName +
                " " +
                paidCourse.data.result.coach.lastName}
            </Text>
          </TouchableOpacity>
        )}
        {course.star > 0 ? <Stars course={course} /> : null}
        <View style={styles.priceWrapper}>
          <Text style={styles.heading}>Price</Text>
          <Text style={styles.heading}>
            {new Intl.NumberFormat("vi-VN").format(course.price * 1000) + " đ"}
          </Text>
        </View>

        {/* -------------- LESSON LIST SECTION -------------- */}
        <View style={styles.lessonListSection}>
          <View style={styles.lessonListContainer}>
            {paidCourse.data &&
              paidCourse.data.result.paidLesson.map((lesson) => (
                <PaidLessonCard
                  key={lesson.id}
                  lesson={lesson}
                  paidCourse={paidCourse.data}
                />
              ))}
          </View>
        </View>

        {/* -------------- REVIEW CARD SECTION -------------- */}
        <View style={styles.reviewSection}>
          <Text style={styles.heading}>Reviews</Text>
          {courseReview.data && courseReview.data.data.length > 0 ? (
            courseReview.data.data.map((review) => (
              <ReviewCard
                review={review}
                setAlredyReview={setAlredyReview}
                key={review.id}
              />
            ))
          ) : (
            <View>
              <Text style={styles.text}>This course has no review yet</Text>
            </View>
          )}
          {courseReview.data && courseReview.data.data.length > 3 ? (
            <TouchableOpacity style={styles.showMoreReviewBtn}>
              <Text style={styles.text}>Show more review</Text>
            </TouchableOpacity>
          ) : null}
        </View>

        {/* -------------- REVIEW INPUT SECTION -------------- */}
        {paidCourse.data && paidCourse.data.unlock && !alredyReview ? (
          <View style={styles.reviewInputSection}>
            <Text style={styles.label}>Write your review</Text>
            <View style={styles.ratingContainer}>
              {Array.from({ length: 5 }).map((_, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setStarRating(index + 1)}
                >
                  <MaterialIcons
                    name={index < starRating ? "star" : "star-outline"}
                    size={s(22)}
                    color={ColorAccent.tertiary}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <TextAreaInput
              ecrypted={false}
              value={reviewText}
              setValue={setReviewText}
              editable={true}
            />

            <TouchableOpacity
              style={styles.reviewBtn}
              onPress={handleCreateReview}
            >
              <Text style={styles.btnText}>Submit post review</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </ScrollView>

      {/* -------------- ACCESS BUTTON SECTION -------------- */}
      {paidCourse.data && paidCourse.data.unlock ? null : (
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btn} onPress={handleCreateOrder}>
            <Text style={styles.btnText}>
              {"Get Full Access - Đ " +
                new Intl.NumberFormat("vi-VN").format(course.price * 1000)}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* -------------- START COURSE BUTTON SECTION -------------- */}
      {paidCourse.data && paidCourse.data.started == false ? (
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btn} onPress={handleStartCourse}>
            <Text style={styles.btnText}>Start course</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {/* -------------- FINISH COURSE BUTTON SECTION -------------- */}
      {paidCourse.data &&
        paidCourse.data.finished == false &&
        lessonPass == paidCourse.data.result.paidLesson.length && (
          <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.btn} onPress={handleFinishedCourse}>
              <Text style={styles.btnText}>Finish course</Text>
            </TouchableOpacity>
          </View>
        )}
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorAccent.primary,
  },
  courseNameContainer: {
    paddingTop: 10,
    paddingBottom: 15,
    justifyContent: "center",
    width: "100%",
  },
  courseNameText: { fontFamily: "Bold", fontSize: "13@s", textAlign: "center" },
  label: {
    paddingLeft: 4,
    fontFamily: "Bold",
  },
  scrollView: {
    paddingHorizontal: 25,
    paddingBottom: 100,
  },
  imageContainer: {
    borderRadius: 10,
  },
  image: {
    borderRadius: 10,
    width: "full",
    height: "150@vs",
  },
  courseDescriptionSection: {
    marginTop: 15,
    gap: 3,
    width: "100%",
  },
  heading: {
    fontFamily: "Bold",
    fontSize: "13@s",
  },
  text: {
    fontFamily: "Semibold",
    fontSize: "11@s",
  },
  showText: {
    fontFamily: "Semibold",
    fontSize: "11@s",
    color: ColorAccent.tertiary,
  },
  settingsIcon: {
    position: "absolute",
    top: 10,
    right: 20,
    zIndex: 100,
    backgroundColor: ColorAccent.tertiary,
    borderRadius: 50,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dropdownMenu: {
    position: "absolute",
    top: 60,
    right: 20,
    backgroundColor: "white",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    zIndex: 1000,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  dropdownText: {
    fontFamily: "Medium",
    fontSize: "12@s",
  },
  lessonListSection: {
    marginVertical: 25,
  },
  lessonListContainer: {
    gap: 15,
  },
  reviewSection: {
    gap: 10,
    width: "100%",
  },
  showMoreReviewBtn: {
    marginTop: 12,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  reviewInputSection: {
    marginTop: 25,
    gap: 15,
  },
  ratingContainer: {
    flexDirection: "row",
    gap: 5,
  },
  reviewBtn: {
    width: 180,
    backgroundColor: ColorAccent.tertiary,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    marginTop: 5,
  },
  btnContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  btn: {
    backgroundColor: ColorAccent.tertiary,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
  },
  btnText: {
    fontFamily: "Bold",
    fontSize: "12@s",
    color: ColorAccent.primary,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: "5@s",
    gap: "10@s",
    paddingHorizontal: "15@s",
  },
  column: {
    flex: 1,
  },
  ratingWrapper: {
    flexDirection: "row",
    gap: 15,
    marginTop: 15,
  },
  starWrapper: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  priceWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  coachImageNameContainer: {
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  avatarContainer: {
    borderRadius: 164,
    borderWidth: 3,
    width: "45@s",
    height: "45@s",
    borderColor: ColorAccent.tertiary,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: "35@s",
    height: "35@s",
    borderRadius: 150,
    resizeMode: "cover",
  },
  coachText: {
    fontFamily: "Bold",
    fontSize: "12@s",
  },
});
