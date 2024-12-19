import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import ColorAccent from "../../constant/Color.js";
import { ScaledSheet } from "react-native-size-matters";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import FreeLessonCard from "../../components/Course/FreeLessonCard.jsx";
import startFreeUserCourse from "../../hooks/UserCourse/startFreeUserCourse.js";
import { successToast } from "../../utils/toastConfig.js";
import { getFreeCourseById } from "../../hooks/Course/getFreeCourseById.js";
import updateFreeUserCourse from "../../hooks/UserCourse/updateFreeUserCourse.js";

export default FreeCourseDetails = (props) => {
  const queryClient = useQueryClient();
  const { course } = props.route.params;
  const [show, setShow] = useState(false);
  const token = userStore((state) => state.token);
  const user = userStore((state) => state.user);
  const [lessonPass, setLessonPass] = useState(0);

  const courseId = course.id;
  const freeCourse = useQuery({
    queryKey: ["freeCourse", token, courseId],
    queryFn: () => getFreeCourseById(token, courseId),
    enabled: !!token,
  });

  const startCourseMutation = useMutation({
    mutationFn: startFreeUserCourse,
    onSuccess: () => {
      successToast("Course notification", "You have started this course 👏🏻");
      queryClient.invalidateQueries(["freeCourse", token, courseId]);
    },
  });

  const finishCourseMutation = useMutation({
    mutationFn: updateFreeUserCourse,
    onSuccess: () => {
      successToast("Course notification", "You have finished this course 🤩");
      queryClient.invalidateQueries(["freeCourse", token, courseId]);
    },
  });

  const handleStartCourse = async () => {
    startCourseMutation.mutate({ user, courseId, token });
  };

  const handleFinishedCourse = async () => {
    const status = 2;
    finishCourseMutation.mutate({ user, courseId, status, token });
  };

  useEffect(() => {
    if (freeCourse.isSuccess && freeCourse.data) {
      const passedLessonsCount = freeCourse.data.result.userLesson.reduce(
        (count, obj) => {
          return obj.status == 1 ? count + 1 : count;
        },
        0
      );

      setLessonPass(passedLessonsCount);
    }
  }, [freeCourse]);
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.courseNameContainer}>
          <Text style={styles.courseNameText}>{course.name}</Text>
        </View>
        {/* COURSE IMAGE SECTION */}
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: course.thumbnail }} />
        </View>

        {/* COURSE DESCRIPTION SECTION */}
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

        {/* LESSON LIST SECTION */}
        <View style={styles.lessonListSection}>
          <View style={styles.lessonListContainer}>
            {freeCourse.data &&
              freeCourse.data.result.freeLesson.map((lesson) => (
                <FreeLessonCard
                  key={lesson.id}
                  lesson={lesson}
                  freeCourse={freeCourse.data}
                />
              ))}
          </View>
        </View>
      </ScrollView>

      {/* ACCESS BUTTON SECTION */}
      {freeCourse.data &&
      (freeCourse.data.started == false || freeCourse.data.started == null) ? (
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btn} onPress={handleStartCourse}>
            <Text style={styles.btnText}>Start Course</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {freeCourse.data &&
        (freeCourse.data.finished == false ||
          freeCourse.data.finished == null) &&
        lessonPass == freeCourse.data.result.freeLesson.length && (
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
  scrollView: {
    paddingTop: 10,
    paddingHorizontal: 25,
    paddingBottom: 100,
  },
  courseNameContainer: {
    paddingTop: 10,
    paddingBottom: 15,
    justifyContent: "center",
    width: "100%",
  },
  courseNameText: { fontFamily: "Bold", fontSize: "13@s", textAlign: "center" },
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
  priceWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
});
