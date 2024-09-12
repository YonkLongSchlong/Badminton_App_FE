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

        {/* Student view */}
        {/* <View style={styles.quantityContainer}>
          <Ionicons
            name="clipboard-outline"
            color={ColorAccent.tertiary}
            size={scale(12)}
          />
          <Text style={styles.text}>
            {props.course.lesson_quantity} Lessons
          </Text>
        </View>
        <Text style={styles.text}>Coach: Michael</Text> */}

        {/* Coach view*/}
        <View style={styles.quantityContainer}>
          <View style={styles.numberLession}>
            <Ionicons
              name="clipboard-outline"
              color={ColorAccent.tertiary}
              size={scale(12)}
            />
            <Text style={styles.text}>
              {props.course.lesson_quantity} Lessons
            </Text>
          </View>
          <Text style={styles.status}>{props.course.status}</Text>
        </View>

        <Text style={styles.heading} numberOfLines={2}>
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
    width: "75@s",
    height: "75@s",
    backgroundColor: ColorAccent.secondary,
  },
  image: {},
  courseNameContainer: {
    width: "70%",
    gap: 5,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  numberLession:{
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
  status:{
    fontFamily: "Medium",
    fontSize: "9@s",
    marginLeft: 150
  }
});
