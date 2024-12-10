import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { scale, ScaledSheet } from "react-native-size-matters";
import ColorAccent from "../../constant/Color.js";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const CourseCard = (props) => {
  const navigation = useNavigation();

  const handleNavigation = () => {
    if (props.course.type == "free") {
      navigation.navigate("FreeCourseDetails", { course: props.course });
    } else {
      navigation.navigate("PaidCourseDetails", { course: props.course });
    }
  };
  return (
    <TouchableOpacity
      onPress={handleNavigation}
      style={styles.container}
      key={props.course.id}
    >
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: props.course.thumbnail }} />
      </View>
      <View style={styles.courseNameContainer}>
        <View style={styles.quantityContainer}>
          <View style={styles.numberLession}>
            <Ionicons
              name="clipboard-outline"
              color={ColorAccent.tertiary}
              size={scale(12)}
            />
            <Text style={styles.text}>
              {props.course.lessonQuantity} Lessons
            </Text>
          </View>
        </View>

        <Text style={styles.heading} numberOfLines={2}>
          {props.course.name}
        </Text>
        <Text style={styles.text}>
          Type:{" "}
          {props.course.type.charAt(0).toUpperCase() +
            props.course.type.slice(1)}
        </Text>
        <Text style={styles.text}>Category: {props.course.category.name}</Text>
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
    width: "80@s",
    height: "80@s",
  },
  image: {
    width: "80@s",
    height: "80@s",
    borderRadius: 10,
  },
  courseNameContainer: {
    width: "70%",
    gap: 5,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  numberLession: {
    flexDirection: "row",
    gap: 5,
  },
  heading: {
    fontFamily: "Bold",
    fontSize: "11@s",
  },
  text: {
    fontFamily: "Medium",
    fontSize: "9@s",
  },
  status: {
    fontFamily: "Medium",
    fontSize: "9@s",
    marginLeft: 150,
  },
});
