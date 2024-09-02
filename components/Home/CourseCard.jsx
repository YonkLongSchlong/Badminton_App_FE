import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { scale, ScaledSheet } from "react-native-size-matters";
import ColorAccent from "../../constant/Color.js";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const CourseCard = (props) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("CourseDetails", { course: props.course })
      }
      style={styles.container}
    >
      <View style={styles.imageContainer}></View>
      <View style={styles.courseNameContainer}>
        <View style={styles.quantityContainer}>
          <Ionicons
            name="clipboard-outline"
            color={ColorAccent.tertiary}
            size={scale(16)}
          />
          <Text style={styles.text}>
            {props.course.lesson_quantity} Lessons
          </Text>
        </View>
        <Text style={styles.heading} numberOfLines={1}>
          {props.course.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CourseCard;

const styles = ScaledSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  imageContainer: {
    borderRadius: 10,
    width: "65@s",
    height: "65@s",
    backgroundColor: ColorAccent.secondary,
  },
  image: {},
  courseNameContainer: {
    gap: 5,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  heading: {
    fontFamily: "Bold",
    fontSize: "12@s",
  },
  text: {
    fontFamily: "Medium",
    fontSize: "10@s",
  },
});
