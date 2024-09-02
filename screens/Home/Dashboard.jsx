import { Image, ScrollView, Text, View } from "react-native";
import React, { useState } from "react";
import { ScaledSheet } from "react-native-size-matters";
import { SafeAreaView } from "react-native-safe-area-context";
import ColorAccent from "../../constant/Color.js";
import InstructorCard from "../../components/Home/InstructorCard.jsx";
import CourseCategoryCard from "../../components/Home/CourseCategoryCard.jsx";
import CourseCard from "../../components/Home/CourseCard.jsx";
import { TouchableOpacity } from "react-native-gesture-handler";

const instructors = [
  {
    id: 1,
    image: require("../../assets/4043232_avatar_batman_comics_hero_icon.png"),
    name: "Michael",
  },
  {
    id: 2,
    image: require("../../assets/4043232_avatar_batman_comics_hero_icon.png"),
    name: "Florida",
  },
  {
    id: 3,
    image: require("../../assets/4043232_avatar_batman_comics_hero_icon.png"),
    name: "Juan",
  },
  {
    id: 4,
    image: require("../../assets/4043232_avatar_batman_comics_hero_icon.png"),
    name: "Doppinder",
  },
  {
    id: 5,
    image: require("../../assets/4043232_avatar_batman_comics_hero_icon.png"),
    name: "Jimmy",
  },
];

const categories = [
  {
    id: 1,
    name: "Popular",
  },
  {
    id: 2,
    name: "Beginner",
  },
  {
    id: 3,
    name: "Intermediate",
  },
  {
    id: 4,
    name: "Advance",
  },
  {
    id: 5,
    name: "Something",
  },
];

const courses = [
  {
    id: 1,
    lesson_quantity: 24,
    name: "Getting started with badminton",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna tempor incididunt ut labore et dolore magna aliqua tempor incididunt ut labore et dolore magna aliqua",
    lessons: [
      {
        id: 1,
        name: "Introduction",
        length: "2 Min 45 Sec",
      },
      {
        id: 2,
        name: "How to get into badminton",
        length: "2 Min 45 Sec",
      },
      {
        id: 3,
        name: "Let's get start with how to hold the racket",
        length: "2 Min 45 Sec",
      },
      {
        id: 4,
        name: "Master your grip",
        length: "2 Min 45 Sec",
      },
      {
        id: 5,
        name: "Your first serve",
        length: "2 Min 45 Sec",
      },
      {
        id: 6,
        name: "Your first serve",
        length: "2 Min 45 Sec",
      },
      {
        id: 7,
        name: "Your first serve",
        length: "2 Min 45 Sec",
      },
    ],
  },
  {
    id: 2,
    lesson_quantity: 24,
    name: "Getting started with badminton",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna tempor incididunt ut labore et dolore magna aliqua tempor incididunt ut labore et dolore magna aliqua",
  },
  {
    id: 3,
    lesson_quantity: 24,
    name: "Getting started with badminton",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna tempor incididunt ut labore et dolore magna aliqua tempor incididunt ut labore et dolore magna aliqua",
  },
  {
    id: 4,
    lesson_quantity: 24,
    name: "Getting started with badminton",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna tempor incididunt ut labore et dolore magna aliqua tempor incididunt ut labore et dolore magna aliqua",
  },
];

const Dashboard = () => {
  const [chosenCategory, setChosenCategory] = useState("Popular");
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* USER GREETING SECTION */}
        <View style={styles.userSection}>
          <Text style={styles.heading}>Hi, Batman</Text>
          <View>
            <Image
              style={styles.image}
              source={require("../../assets/4043232_avatar_batman_comics_hero_icon.png")}
            ></Image>
          </View>
        </View>

        {/* HERO SECTION */}
        <View style={styles.heroSection}>
          <View style={styles.headlineContainer}>
            <Text style={styles.heroHeadline}>
              Discover How To Develop And Improve Your Skill
            </Text>
          </View>
          <View style={styles.heroImageContainer}>
            <Image
              style={styles.heroImage}
              source={require("../../assets/badminton-5542285_1280.png")}
            ></Image>
          </View>
        </View>

        {/* INSTRUCTOR LIST SECTION */}
        <View style={styles.instructorSection}>
          <View style={styles.instructorHeadlineContainer}>
            <Text style={styles.heading}>Instructor</Text>
            <Text style={([styles.text], { color: ColorAccent.tertiary })}>
              See all
            </Text>
          </View>
          <ScrollView
            contentContainerStyle={styles.instructorListContainer}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {instructors.map((instructor) => (
              <InstructorCard key={instructor.id} instructor={instructor} />
            ))}
          </ScrollView>
        </View>

        {/* COURSES LIST SECTION */}
        <View style={styles.coursesSection}>
          <Text style={styles.heading}>Courses</Text>

          <ScrollView
            contentContainerStyle={styles.categoryListContainer}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {categories.map((category) => (
              <CourseCategoryCard
                key={category.id}
                category={category}
                chosenCategory={chosenCategory}
                setChosenCategory={setChosenCategory}
              />
            ))}
          </ScrollView>

          <View style={styles.courseListContainer}>
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </View>

          <TouchableOpacity style={styles.exploreBtn}>
            <Text style={[styles.heading, { color: "white" }]}>
              Explore more
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
  userSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 15,
    marginTop: 25,
  },
  heading: {
    fontFamily: "Bold",
    fontSize: "14@s",
  },
  text: {
    fontFamily: "Regular",
    fontSize: "10@s",
  },
  imageContainer: {
    borderRadius: "100",
  },
  image: {
    width: "45@s",
    height: "45@vs",
    resizeMode: "contain",
  },
  heroSection: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    borderRadius: 10,
    paddingHorizontal: 40,
    paddingVertical: 15,
    backgroundColor: ColorAccent.tertiary,
  },
  headlineContainer: {
    width: "70%",
  },
  heroHeadline: {
    fontFamily: "Bold",
    fontSize: "16@s",
    color: "white",
  },
  heroImageContainer: {
    width: "30%",
    alignItems: "center",
  },
  heroImage: {
    height: "80@vs",
    resizeMode: "contain",
  },
  instructorSection: {
    marginTop: 20,
  },
  instructorHeadlineContainer: {
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  instructorListContainer: {
    gap: 17,
    justifyContent: "space-between",
  },
  coursesSection: {
    marginTop: 30,
    paddingBottom: 20,
    gap: 15,
  },
  categoryListContainer: {
    gap: 15,
    justifyContent: "space-between",
  },
  courseListContainer: {
    paddingHorizontal: 5,
    marginTop: 12,
    gap: 15,
  },
  exploreBtn: {
    flex: 1,
    flexDirection: "row",
    borderRadius: 15,
    backgroundColor: ColorAccent.tertiary,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
});
