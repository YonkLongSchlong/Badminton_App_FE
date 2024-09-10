import { ScrollView, TouchableOpacity, View, Text } from "react-native";
import React from "react";
import { ScaledSheet } from "react-native-size-matters";
import { SafeAreaView } from "react-native-safe-area-context";
import CourseCardCoach from "../../components/Home/CourseCardCoach.jsx";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

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
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>My Courses</Text>
          <TouchableOpacity onPress={() => navigation.navigate("AddCourse")} style={styles.iconAddCourse}>
            <MaterialIcons
              name="post-add"
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={true}
        >
          <View style={styles.courseListContainer}>
            {courses.map((course) => (
              <CourseCardCoach key={course.id} course={course} />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
  const styles = ScaledSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
    },
    header: {
      height: 60, // Đặt chiều cao cho header
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f5f5f5",
    },
    headerText: {
      fontSize: "18@s",
      fontWeight: "bold",
    },
    iconAddCourse: {
      position: "absolute",
      right: 15,
      
    },
    scrollView: {
      flex: 1,
    },
    courseListContainer: {
      paddingHorizontal: 5,
      marginTop: 12,
      gap: 15,
    },
  });