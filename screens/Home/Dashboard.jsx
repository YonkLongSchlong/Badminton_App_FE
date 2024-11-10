import { Image, ScrollView, Text, View } from "react-native";
import React, { useState } from "react";
import { ScaledSheet } from "react-native-size-matters";
import { SafeAreaView } from "react-native-safe-area-context";
import ColorAccent from "../../constant/Color.js";
import InstructorCard from "../../components/Home/InstructorCard.jsx";
import CourseCategoryCard from "../../components/Home/CourseCategoryCard.jsx";
import CourseCard from "../../components/Home/CourseCard.jsx";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";

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
    name: "All",
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
    name: "The only badminton course you need",
    description:
      "New to badminton and eager to learn the ropes? Our “Getting started with badminton” course is the perfect starting point for you! This beginner-friendly course is designed to introduce you to the fundamentals of badminton in a supportive and engaging environment.",
    lessons: [
      {
        id: 1,
        name: "Introduction",
        length: "2 mins, 45 secs",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Utenim ad minim veniam, quis nostrud exercitation ullamco laborisnisi ut aliquip",
        videoUrl: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
      },
      {
        id: 2,
        name: "How to get into badminton",
        length: "2 mins, 45 secs",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Utenim ad minim veniam, quis nostrud exercitation ullamco laborisnisi ut aliquip",
        videoUrl:
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      },
      {
        id: 3,
        name: "Let's get start with how to hold the racket",
        length: "2 mins, 45 secs",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Utenim ad minim veniam, quis nostrud exercitation ullamco laborisnisi ut aliquip",
        videoUrl:
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      },
      {
        id: 4,
        name: "Master your grip",
        length: "2 mins, 45 secs",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Utenim ad minim veniam, quis nostrud exercitation ullamco laborisnisi ut aliquip",
        videoUrl: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
      },
      {
        id: 5,
        name: "Your first serve",
        length: "2 mins, 45 secs",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Utenim ad minim veniam, quis nostrud exercitation ullamco laborisnisi ut aliquip",
        videoUrl: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
      },
      {
        id: 6,
        name: "Your first serve",
        length: "2 mins, 45 secs",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Utenim ad minim veniam, quis nostrud exercitation ullamco laborisnisi ut aliquip",
        videoUrl: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
      },
      {
        id: 7,
        name: "Your first serve",
        length: "2 mins, 45 secs",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Utenim ad minim veniam, quis nostrud exercitation ullamco laborisnisi ut aliquip",
        videoUrl: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
      },
    ],
  },
  {
    id: 2,
    lesson_quantity: 24,
    name: "The only badminton course you need to become a supreme competitor",
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
  {
    id: 5,
    lesson_quantity: 24,
    name: "Getting started with badminton",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna tempor incididunt ut labore et dolore magna aliqua tempor incididunt ut labore et dolore magna aliqua",
  },
];

const Dashboard = () => {
  const [chosenCategory, setChosenCategory] = useState("All");
  const user = userStore((state) => state.user);

  const avatarSrc =
    user.avatar === null
      ? require("../../assets/4043232_avatar_batman_comics_hero_icon.png")
      : {uri: user.avatar};
  const userFullName = user.firstName && user.lastName === null ? "User" : `${user.firstName} ${user.lastName}`;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ----------- USER GREETING SECTION ----------- */}
        <View style={styles.userSection}>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={styles.heading}>Hi, {userFullName}</Text>
            <Text style={styles.text}>Let get you back on track</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={avatarSrc}></Image>
          </View>
        </View>

        {/* ----------- HERO SECTION ----------- */}
        <View style={styles.heroSection}>
          <View style={styles.headlineContainer}>
            <Text style={styles.heroHeadline}>
              Discover How To Develope And Improve Your Skill
            </Text>
          </View>
          <View style={styles.heroImageContainer}>
            <Image
              style={styles.heroImage}
              source={require("../../assets/badminton-5542285_1280.png")}
            ></Image>
          </View>
        </View>

        {/* ----------- INSTRUCTOR LIST SECTION ----------- */}
        <View style={styles.instructorSection}>
          <View style={styles.instructorHeadlineContainer}>
            <Text style={styles.heading}>Instructors</Text>
            <Text style={[styles.text, { color: ColorAccent.tertiary }]}>
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

        {/* ----------- COURSES LIST SECTION ----------- */}
        <View style={styles.coursesSection}>
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

          <View style={styles.exploreBtnContainer}>
            <TouchableOpacity style={styles.exploreBtn}>
              <Text style={[styles.subHeading, { color: "white" }]}>
                Explore more
              </Text>
            </TouchableOpacity>
          </View>
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
    paddingBottom: 10,
  },
  userSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 18,
    marginTop: 30,
  },
  heading: {
    fontFamily: "Bold",
    fontSize: "12@s",
  },
  subHeading: {
    fontFamily: "Bold",
    fontSize: "12@s",
  },
  text: {
    fontFamily: "Semibold",
    fontSize: "9@s",
  },
  imageContainer: {
    marginRight: 3,
    borderRadius: 150,
  },
  image: {
    width: "45@s",
    height: "45@s",
    borderRadius: 150,
    resizeMode: "cover",
  },
  heroSection: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    borderRadius: 5,
    paddingHorizontal: 40,
    paddingVertical: 15,
    backgroundColor: ColorAccent.tertiary,
  },
  headlineContainer: {
    width: "60%",
  },
  heroHeadline: {
    fontFamily: "Bold",
    fontSize: "14@s",
    color: "white",
  },
  heroImageContainer: {
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
  },
  heroImage: {
    height: "90@vs",
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
    marginTop: 25,
    paddingBottom: 20,
    gap: 10,
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
  exploreBtnContainer: {
    marginTop: 10,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  exploreBtn: {
    flexDirection: "row",
    borderRadius: 5,
    backgroundColor: ColorAccent.tertiary,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 50,
  },
});
