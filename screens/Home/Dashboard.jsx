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
import { useQuery } from "@tanstack/react-query";
import { getCourses } from "../../hooks/Course/getCourses.js";
import { getCoaches } from "../../hooks/Coach/getCoaches.js";

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
    name: "Free",
  },
  {
    id: 6,
    name: "Paid",
  },
];

const Dashboard = () => {
  const [chosenCategory, setChosenCategory] = useState("All");
  const user = userStore((state) => state.user);
  const token = userStore((state) => state.token);
  const logout = userStore((state) => state.logout);

  const avatarSrc =
    user.avatar === null
      ? require("../../assets/4043232_avatar_batman_comics_hero_icon.png")
      : { uri: user.avatar };

  const userFullName =
    user.firstName && user.lastName === null
      ? "User"
      : `${user.firstName} ${user.lastName}`;

  const courses = useQuery({
    queryKey: ["courses", token, chosenCategory],
    queryFn: () => getCourses(token, chosenCategory),
    enabled: !!token,
  });

  const coaches = useQuery({
    queryKey: ["coaches", token],
    queryFn: () => getCoaches(token),
    enabled: !!token,
  });

  if (courses.isError) {
    async () => {
      await logout();
    };
  }

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
            {coaches.data &&
              coaches.data.map((coach) => (
                <InstructorCard key={coach.id} coach={coach} />
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
            {courses.data &&
              courses.data.data.map((course) => (
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
    width: "40@s",
    height: "40@s",
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
