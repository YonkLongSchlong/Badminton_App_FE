import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { scale, ScaledSheet } from "react-native-size-matters";
import ColorAccent from "../../constant/Color.js";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { Chase } from "react-native-animated-spinkit";
import Color from "../../constant/Color.js";

export default OverviewCourseCard = (props) => {
  const navigation = useNavigation();
  const [course, setCourse] = useState(null);

  const handleNavigation = () => {
    if (props.course.paidCourse == undefined) {
      navigation.navigate("FreeCourseDetails", {
        course: props.course.freeCourse,
      });
    } else {
      navigation.navigate("PaidCourseDetails", {
        course: props.course.paidCourse,
      });
    }
  };

  useEffect(() => {
    if (props.course.paidCourse == undefined) {
      console.log(props.course.freeCourse);

      setCourse(props.course.freeCourse);
    } else {
      setCourse(props.course.paidCourse);
    }
  }, []);

  if (course == null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Chase size={50} color={Color.tertiary} />
      </View>
    );
  }

  return (
    <TouchableOpacity
      onPress={handleNavigation}
      style={styles.container}
      key={course.id}
    >
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: course.thumbnail }} />
      </View>
      <View style={styles.courseNameContainer}>
        <View style={styles.quantityContainer}>
          <View style={styles.numberLession}>
            <Ionicons
              name="clipboard-outline"
              color={ColorAccent.tertiary}
              size={scale(12)}
            />
            <Text style={styles.text}>{course.lessonQuantity} Lessons</Text>
          </View>
        </View>
        <Text style={styles.heading} numberOfLines={2}>
          {course.name}
        </Text>
        <Text style={styles.text}>
          Type: {course.type.charAt(0).toUpperCase() + course.type.slice(1)}
        </Text>
        <Text style={styles.text}>Category: {course.category.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

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
