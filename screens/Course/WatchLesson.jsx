import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Video } from "expo-av";
import ColorAccent from "../../constant/Color.js";
import MoreLessonCard from "../../components/Course/MoreLessonCard.jsx";


const moreLesson = [
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
];

export default function WatchLesson(props) {
  const { lesson } = props.route.params;
  console.log(lesson);
  const videoRef = useRef(null);
  const [show, setShow] = useState(false);
  const { navigation } = props;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Video Player Section */}
      <View style={styles.videoSection}>
        <Video
          ref={videoRef}
          source={{
            uri: lesson.videoUrl,
          }}
          style={styles.videoThumbnail}
          resizeMode="cover"
          useNativeControls
          isLooping
        />
      </View>
      {/* Course Description Section */}
      <View style={styles.courseDescription}>
        <View style={styles.welcomeWrapper}>
          <Text style={styles.courseTitle}>Welcome to the Lesson</Text>
          <Text style={styles.courseTime}>{lesson.length}</Text>
        </View>
        <View style={styles.courseDescriptionSection}>
          <View>
            <Text style={styles.text} numberOfLines={!show ? 3 : null}>
              {lesson.description}
            </Text>
            <TouchableOpacity onPress={() => setShow(!show)}>
              <Text style={styles.showText}>
                {!show ? "Show more" : "Show less"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Lesson List Section */}
      <View style={styles.lessonList}>
        <Text style={styles.moreLessons}>More Lessons</Text>
        {moreLesson.map((lesson) => (
          <MoreLessonCard key={lesson.id} lesson={lesson} navigation={navigation} />
        ))}
      </View>
    </ScrollView>
  );
}

const renderLesson = (number, title, time) => (
  <TouchableOpacity style={styles.lesson}>
    <Text style={styles.lessonNumber}>{number}</Text>
    <View style={styles.lessonInfo}>
      <Text style={styles.lessonTitle}>{title}</Text>
      <Text style={styles.lessonTime}>{time}</Text>
    </View>
    <Ionicons name="chevron-forward-outline" size={24} color="#A4A4A4" />
  </TouchableOpacity>
);

const styles = ScaledSheet.create({
  container: {
    paddingHorizontal: "20@s",
    paddingBottom: "50@s",
    backgroundColor: ColorAccent.primary,
  },
  videoSection: {
    marginTop: "10@s",
    borderRadius: "10@s",
    overflow: "hidden",
  },
  videoThumbnail: {
    width: "100%",
    height: "200@vs",
    borderRadius: "10@s",
  },
  courseDescription: {
    marginVertical: "10@s",
  },
  welcomeWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  courseTitle: {
    fontSize: "20@s",
    fontFamily: "Bold",
    width: "50%",
  },
  courseTime: {
    fontSize: "14@s",
    fontFamily: "Regular",
    color: "#666",
  },
  sectionTitle: {
    fontSize: "16@s",
    fontFamily: "Bold",
    marginTop: "10@s",
  },
  text: {
    fontFamily: "Medium",
    fontSize: "12@s",
  },
  showText: {
    fontFamily: "Semibold",
    fontSize: "12@s",
    color: ColorAccent.tertiary,
  },
  moreLessons: {
    fontSize: "18@s",
    fontFamily: "Bold",
    marginBottom: "10@s",
  },
  lesson: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "15@s",
    padding: "10@s",
    backgroundColor: "#f9f9f9",
    borderRadius: "10@s",
  },
  lessonNumber: {
    fontSize: "20@s",
    fontFamily: "Bold",
    color: "#A4A4A4",
  },
  lessonInfo: {
    flex: 1,
    marginLeft: "10@s",
  },
  lessonTitle: {
    fontSize: "16@s",
    fontFamily: "Medium",
  },
  lessonTime: {
    fontSize: "12@s",
    fontFamily: "Regular",
    color: "#A4A4A4",
  },
});
