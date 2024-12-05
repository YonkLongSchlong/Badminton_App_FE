import React from "react";
import { Image, Text, View } from "react-native";
import { s, ScaledSheet } from "react-native-size-matters";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import ColorAccent from "../../constant/Color.js";

export const ReviewCard = (props) => {
  return (
    <View style={styles.reviewBlock}>
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
      <View style={styles.commentAndRatingContainer}>
        <View style={styles.usernameAnTextContainer}>
          <Text style={styles.username}>
            {props.review.user.firstName + " " + props.review.user.lastName}
          </Text>
          <Text style={styles.reviewText}>{props.review.comment}</Text>
        </View>
        <View style={styles.ratingContainer}>
          {Array.from({ length: props.review.rating }).map((_, index) => (
            <MaterialIcons
              key={index}
              name="star"
              size={s(18)}
              color={ColorAccent.tertiary}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  reviewBlock: {
    flexDirection: "row",
    gap: 10,
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
    width: "85%",
    flexShrink: 1,
  },
  username: {
    fontFamily: "Bold",
    fontSize: "11@s",
  },
  ratingContainer: {
    flexDirection: "row",
    gap: 3,
  },
  reviewText: {
    width: "85%",
    fontFamily: "Medium",
    fontSize: "11@s",
  },
});
