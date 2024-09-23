import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { ScaledSheet } from "react-native-size-matters";

const MoreLessonCard = (props) => {
  const { navigation } = props;

  return (
    <TouchableOpacity
      style={styles.lesson}
      onPress={() =>
        navigation.navigate("WatchLesson", { lesson: props.lesson })
      }
    >
      <Text style={styles.lessonNumber}>{props.lesson.id}</Text>
      <View style={styles.lessonInfo}>
        <Text style={styles.lessonTitle}>{props.lesson.name}</Text>
        <Text style={styles.lessonTime}>{props.lesson.length}</Text>
      </View>
      <Ionicons name="chevron-forward-outline" size={24} color="#A4A4A4" />
    </TouchableOpacity>
  );
};

export default MoreLessonCard;

const styles = ScaledSheet.create({
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
