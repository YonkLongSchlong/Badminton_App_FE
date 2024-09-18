import {
  ScrollView,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import React, { useState } from "react";
import { ScaledSheet } from "react-native-size-matters";
import { SafeAreaView } from "react-native-safe-area-context";
import CourseCard from "../../components/Home/CourseCard.jsx";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import ColorAccent from "../../constant/Color.js";
import { Searchbar } from "react-native-paper";

const courses = [
  {
    id: 1,
    lesson_quantity: 24,
    name: "The only badminton course you need",
    status: "publish",
    description:
      "New to badminton and eager to learn the ropes? Our “Getting started with badminton” course is the perfect starting point for you! This beginner-friendly course is designed to introduce you to the fundamentals of badminton in a supportive and engaging environment.",
    lessons: [
      {
        id: 1,
        name: "Introduction",
        length: "2 mins, 45 secs",
      },
      {
        id: 2,
        name: "How to get into badminton",
        length: "2 mins, 45 secs",
      },
      {
        id: 3,
        name: "Let's get start with how to hold the racket",
        length: "2 mins, 45 secs",
      },
      {
        id: 4,
        name: "Master your grip",
        length: "2 mins, 45 secs",
      },
      {
        id: 5,
        name: "Your first serve",
        length: "2 mins, 45 secs",
      },
      {
        id: 6,
        name: "Your first serve",
        length: "2 mins, 45 secs",
      },
      {
        id: 7,
        name: "Your first serve",
        length: "2 mins, 45 secs",
      },
    ],
  },
  {
    id: 2,
    lesson_quantity: 24,
    name: "The only badminton course you need to become a supreme competitor",
    status: "private",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna tempor incididunt ut labore et dolore magna aliqua tempor incididunt ut labore et dolore magna aliqua",
  },
  {
    id: 3,
    lesson_quantity: 24,
    name: "Getting started with badminton",
    status: "publish",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna tempor incididunt ut labore et dolore magna aliqua tempor incididunt ut labore et dolore magna aliqua",
  },
  {
    id: 4,
    lesson_quantity: 24,
    name: "Getting started with badminton",
    status: "private",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna tempor incididunt ut labore et dolore magna aliqua tempor incididunt ut labore et dolore magna aliqua",
  },
  {
    id: 5,
    lesson_quantity: 24,
    name: "Getting started with badminton",
    status: "publish",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna tempor incididunt ut labore et dolore magna aliqua tempor incididunt ut labore et dolore magna aliqua",
  },
  {
    id: 6,
    lesson_quantity: 24,
    name: "Getting started with badminton",
    status: "publish",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna tempor incididunt ut labore et dolore magna aliqua tempor incididunt ut labore et dolore magna aliqua",
  },
  {
    id: 7,
    lesson_quantity: 24,
    name: "Getting started with badminton",
    status: "publish",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna tempor incididunt ut labore et dolore magna aliqua tempor incididunt ut labore et dolore magna aliqua",
  },
  {
    id: 8,
    lesson_quantity: 24,
    name: "Getting started with badminton",
    status: "publish",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna tempor incididunt ut labore et dolore magna aliqua tempor incididunt ut labore et dolore magna aliqua",
  },
  {
    id: 9,
    lesson_quantity: 24,
    name: "Getting started with badminton",
    status: "publish",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna tempor incididunt ut labore et dolore magna aliqua tempor incididunt ut labore et dolore magna aliqua",
  },
];

export default function MyCourses({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
      </View>

      {/* Thanh tìm kiếm */}
      <Searchbar
        placeholder="Search course"
        onChangeText={setSearchQuery}
        value={searchQuery}
        iconColor={ColorAccent.tertiary}
        style={styles.searchBar}
      />

      {/* Danh sách khóa học */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
      >
        <View style={styles.courseListContainer}>
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </View>
      </ScrollView>

      {/* Nút Add new course */}
      <TouchableOpacity
        onPress={() => navigation.navigate("AddCourse")}
        style={styles.addCourse}
      >
        <MaterialIcons name="post-add" size={24} color="white" />
        <Text style={styles.addButtonText}>Add new course</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorAccent.primary,
  },
  header: {
    height: 40,
  },
  searchBar: {
    margin: "10@s",
    borderRadius: "30@s",
    elevation: 2,
    backgroundColor: ColorAccent.primary,
    borderWidth: 1,
    borderColor: ColorAccent.tertiary,
  },
  scrollView: {
    flex: 1,
  },
  courseListContainer: {
    paddingHorizontal: 5,
    gap: 15,
  },
  addCourse: {
    position: "absolute",
    right: "10@s",
    bottom: "20@s",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: ColorAccent.tertiary,
    paddingVertical: "12@s",
    paddingHorizontal: "15@s",
    borderRadius: "5@s",
  },
  addButtonText: {
    marginLeft: "8@s",
    fontSize: "16@s",
    color: ColorAccent.primary,
    fontFamily: "Bold",
  },
});
