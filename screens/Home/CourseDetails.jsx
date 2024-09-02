import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import ColorAccent from "../../constant/Color.js";
import { ScaledSheet } from "react-native-size-matters";
import { SafeAreaView } from "react-native-safe-area-context";
import LessonCard from "../../components/Course/LessonCard.jsx";

const CourseDetails = (props) => {
  const { course } = props.route.params;
  const [show, setShow] = useState(false);

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
          <View>
            <Text style={styles.text} numberOfLines={!show ? 3 : null}>
              {course.description}
            </Text>
            <TouchableOpacity onPress={() => setShow(!show)}>
              <Text style={styles.showText}>
                {!show ? "Show more" : "Show less"}
              </Text>
            </TouchableOpacity>
          </View>
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
  },
  scrollView: {
    paddingTop: 10,
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
    gap: 5,
  },
  heading: {
    fontFamily: "Bold",
    fontSize: "13@s",
  },
  text: {
    fontFamily: "Medium",
    fontSize: "10@s",
  },
  showText: {
    fontFamily: "Semibold",
    fontSize: "10@s",
    color: ColorAccent.tertiary,
  },
  lessonListSection: {
    marginVertical: 25,
  },
  lessonListContainer: {
    gap: 15,
  },
  btnContainer: {
    position: "absolute",
    left: 0,
    bottom: 0,
    backgroundColor: "white",
    // borderColor: "gray",
    // borderTopWidth: StyleSheet.hairlineWidth,
    // borderLeftWidth: StyleSheet.hairlineWidth,
    // borderRightWidth: StyleSheet.hairlineWidth,
    // borderBottomLeftRadius: 0,
    // borderBottomRightRadius: 0,
    // borderRadius: 20,
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
