import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import ColorAccent from "../../constant/Color.js";
import { ScaledSheet } from "react-native-size-matters";
import { SafeAreaView } from "react-native-safe-area-context";
import LessonCard from "../../components/Course/LessonCard.jsx";

const CourseDetails = (props) => {
  const { course } = props.route.params;

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* COURSE IMAGE SECTION */}
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require("../../assets/course_banner.jpg")}
          />
        </View>

        {/* COURSE DESCRIPTION SECTION */}
        <View style={styles.courseDescriptionSection}>
          <Text style={styles.heading}>Description</Text>
          <Text style={styles.text}>{course.description}</Text>
        </View>

        {/* LESSON LIST SECTION */}
        <View style={styles.lessonListSection}>
          <View style={styles.lessonListContainer}>
            {course.lessons.map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* ACCESS BUTTON SECTION */}
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Get Full Access - Đ 255.000</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CourseDetails;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorAccent.primary,
    // backgroundColor: "red",
  },
  scrollView: {
    paddingTop: 10,
    paddingHorizontal: 20,
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
    gap: 5,
  },
  heading: {
    fontFamily: "Bold",
    fontSize: "14@s",
  },
  subHeading: {
    fontFamily: "Bold",
    fontSize: "10@s",
  },
  text: {
    fontFamily: "Regular",
    fontSize: "11@s",
  },
  subText: {
    fontFamily: "Regular",
    fontSize: "8@s",
  },
  lessonListSection: {
    marginTop: 25,
  },
  lessonListContainer: {
    gap: 15,
  },
  btnContainer: {
    position: "absolute",
    left: 0,
    bottom: 0,
    backgroundColor: ColorAccent.primary,
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 20,
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
});
