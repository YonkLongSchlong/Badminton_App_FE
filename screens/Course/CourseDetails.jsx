import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import ColorAccent from "../../constant/Color.js";
import { ScaledSheet } from "react-native-size-matters";
import Ionicons from "@expo/vector-icons/Ionicons";
import LessonCard from "../../components/Course/LessonCard.jsx";

const CourseDetails = (props) => {
  const { course } = props.route.params;
  const [show, setShow] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { navigation } = props;

  const toggleDropdown = () => setDropdownVisible(!dropdownVisible);

  const handleDelete = () => {
    console.log("Course deleted");
    setDropdownVisible(false);
  };

  const handleUpdate = () => {
    navigation.navigate("AddCourse", { course });
    setDropdownVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Settings Icon */}
      <TouchableOpacity style={styles.settingsIcon} onPress={toggleDropdown}>
        <Ionicons
          name="settings-outline"
          size={24}
          color={ColorAccent.primary}
        />
      </TouchableOpacity>

      {/* Dropdown for settings */}
      {dropdownVisible && (
        <View style={styles.dropdownMenu}>
          <TouchableOpacity style={styles.dropdownItem} onPress={handleUpdate}>
            <Text style={styles.dropdownText}>Update Course</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dropdownItem} onPress={handleDelete}>
            <Text style={styles.dropdownText}>Delete Course</Text>
          </TouchableOpacity>
        </View>
      )}
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
        <View style={styles.priceWrapper}>
          <Text style={styles.heading}>Price</Text>
          <Text style={styles.heading}>255.000 đ</Text>
        </View>
        

        {/* LESSON LIST SECTION */}
        <View style={styles.lessonListSection}>
          <View style={styles.lessonListContainer}>
            {course.lessons.map((lesson) => (
              <LessonCard
                navigation={navigation}
                key={lesson.id}
                lesson={lesson}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* ACCESS BUTTON SECTION */}
      {/* Student View */}
      {/* <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Get Full Access - Đ 255.000</Text>
        </TouchableOpacity>
      </View> */}

      {/* Coach View */}
      <View style={styles.rowContainer}>
        <View style={styles.column}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate("AddLesson")}
          >
            <Text style={styles.btnText}>Add lesson</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.column}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate("PublicCourse")}
          >
            <Text style={styles.btnText}>Publish</Text>
          </TouchableOpacity>
        </View>
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
  priceWrapper:{
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "5@s"
  }
});
