import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import ColorAccent from "../../constant/Color.js";
import { ScaledSheet } from "react-native-size-matters";
import Ionicons from "@expo/vector-icons/Ionicons";
import LessonCard from "../../components/Course/LessonCard.jsx";
import { getFreeCourseById } from "../../hooks/Course/getFreeCourseById.js";
import { useQuery } from "@tanstack/react-query";
import FreeLessonCard from "../../components/Course/FreeLessonCard.jsx";
import { getUserLesson } from "../../hooks/UserLesson/getUserLesson.js";

export default FreeCourseDetails = (props) => {
  const { course } = props.route.params;
  const [show, setShow] = useState(false);
  const token = userStore((state) => state.token);
  const user = userStore((state) => state.user);

  const courseId = course.id;
  const freeCourse = useQuery({
    queryKey: ["freeCourse", token, courseId],
    queryFn: () => getFreeCourseById(token, courseId),
    enabled: !!token,
  });

  const userLesson = useQuery({
    queryKey: ["userLesson", token, courseId],
    queryFn: () => getUserLesson(token, user, courseId),
    enabled: !!token,
  });

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
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
              freeCourse.data.freeLesson.map((lesson) => (
                <FreeLessonCard key={lesson.id} lesson={lesson} />
              ))}
          </View>
        </View>
      </ScrollView>

      {/* ACCESS BUTTON SECTION */}
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Start Learning</Text>
        </TouchableOpacity>
      </View>

      {/* ACCESS BUTTON SECTION
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Start Learning</Text>
        </TouchableOpacity>
      </View> */}
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
