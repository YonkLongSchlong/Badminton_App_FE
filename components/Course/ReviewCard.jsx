import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { s, ScaledSheet } from "react-native-size-matters";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import ColorAccent from "../../constant/Color.js";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateReview } from "../../hooks/Review/updateReview.js";
import { deleteReview } from "../../hooks/Review/deleteReview.js";

const options = [
  {
    id: 1,
    name: "Edit",
  },
  {
    id: 2,
    name: "Delete",
  },
];

export const ReviewCard = (props) => {
  const [showOptionContainer, setShowOptionContainer] = useState(false);
  const [selectOptions, setSelectOptions] = useState("");
  const [reviewText, setReviewText] = useState(props.review.comment);
  const [starRating, setStarRating] = useState(props.review.rating);
  const [isFocus, setIsFocus] = useState(false);
  const user = userStore((state) => state.user);
  const token = userStore((state) => state.token);
  const queryClient = useQueryClient();

  const reviewMutation = useMutation({
    mutationFn: updateReview,
    onSuccess: () => {
      queryClient.invalidateQueries("courseReview");
    },
    onError: (data) => {
      errorToast(data.message);
    },
  });

  const reviewDeleteMutation = useMutation({
    mutationFn: deleteReview,
    onSuccess: () => {
      queryClient.invalidateQueries("courseReview");
    },
    onError: (data) => {
      errorToast(data.message);
    },
  });

  const handleReviewMutation = async () => {
    const reviewId = props.review.id;
    const courseId = props.review.paidCourseId;
    await reviewMutation.mutateAsync({
      user,
      token,
      courseId,
      reviewId,
      reviewText,
      starRating,
    });
    setSelectOptions("");
  };

  const handleReviewDeleteMutation = async () => {
    const reviewId = props.review.id;
    const courseId = props.review.paidCourseId;
    await reviewDeleteMutation.mutateAsync({
      user,
      token,
      reviewId,
      courseId,
    });
    setSelectOptions("");
    props.setAlredyReview(false);
  };

  return (
    <View style={styles.reviewBlock}>
      <View style={{ flexDirection: "row", gap: 10 }}>
        {/* -----------  AVATAR SECTION ------------------ */}
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={
              props.review.user.avatar
                ? { uri: props.review.user.avatar }
                : require("../../assets/4043232_avatar_batman_comics_hero_icon.png")
            }
          />
        </View>

        {/* ----------- NAME AND COMMENT SECTIONS ------------------ */}
        <View style={styles.commentAndRatingContainer}>
          <View style={styles.usernameAnTextContainer}>
            <Text style={styles.username}>
              {props.review.user.firstName + " " + props.review.user.lastName}
            </Text>
            <View style={{ width: s(230) }}>
              <TextInput
                style={[
                  styles.reviewText,
                  selectOptions == "Edit"
                    ? {
                        borderWidth: 1,
                        borderColor: ColorAccent.secondary,
                        borderRadius: 5,
                        marginTop: 5,
                        paddingHorizontal: 20,
                        paddingVertical: 5,
                      }
                    : {},
                ]}
                multiline={true}
                onChangeText={(newText) => setReviewText(newText)}
                editable={selectOptions == "Edit" ? true : false}
                focusable={selectOptions == "Edit" ? true : false}
              >
                {props.review.comment}
              </TextInput>
            </View>
          </View>
          <View style={styles.ratingContainer}>
            {Array.from({ length: props.review.rating }).map((_, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  if (selectOptions == "Edit") {
                    setStarRating(index + 1);
                  }
                }}
              >
                <MaterialIcons
                  name={index < starRating ? "star" : "star-outline"}
                  size={s(22)}
                  color={ColorAccent.tertiary}
                />
              </TouchableOpacity>
            ))}
          </View>
          {selectOptions == "Edit" && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                gap: 15,
              }}
            >
              <TouchableOpacity
                style={{
                  marginVertical: 5,
                }}
                onPress={() => {
                  setSelectOptions("");
                  setStarRating(props.review.rating);
                }}
              >
                <Text style={styles.reviewText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginVertical: 5,
                }}
                onPress={handleReviewMutation}
              >
                <Text style={styles.reviewText}>Save</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      {/* ----------- THREE DOT SECTION ------------------ */}
      <TouchableOpacity
        style={{ alignSelf: "stretch" }}
        onPress={() => setShowOptionContainer(!showOptionContainer)}
      >
        <MaterialCommunityIcons
          name="dots-vertical"
          size={s(18)}
          color={ColorAccent.tertiary}
        />
      </TouchableOpacity>
      {showOptionContainer && (
        <View style={styles.optionsTab}>
          {options.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={styles.tab}
              onPress={() => {
                if (option.name == "Delete") {
                  handleReviewDeleteMutation();
                } else {
                  setSelectOptions(option.name);
                  setShowOptionContainer(false);
                  setIsFocus(true);
                }
              }}
            >
              <Text style={styles.tabText}>{option.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = ScaledSheet.create({
  reviewBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  avatarContainer: {
    marginRight: 3,
    borderRadius: 150,
  },
  avatar: {
    width: "37@s",
    height: "37@s",
    borderRadius: 150,
    resizeMode: "cover",
  },
  commentAndRatingContainer: {
    flexDirection: "column",
    gap: 5,
  },
  usernameAnTextContainer: {
    width: "100%",
    flexShrink: 1,
  },
  username: {
    fontFamily: "Bold",
    fontSize: "11@s",
  },
  ratingContainer: {
    flexDirection: "row",
    gap: 3,
    marginTop: 5,
  },
  reviewText: {
    color: ColorAccent.black,
    width: "100%",
    fontFamily: "Medium",
    fontSize: "11@s",
  },
  optionsTab: {
    backgroundColor: ColorAccent.secondary,
    position: "absolute",
    right: 25,
    top: 0,
    paddingHorizontal: s(13),
    paddingVertical: s(3),
    zIndex: 9999,
    borderRadius: 10,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  tabText: {
    fontFamily: "Semibold",
    fontSize: "11@s",
  },
});
