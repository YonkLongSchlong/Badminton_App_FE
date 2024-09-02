import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { scale, ScaledSheet } from "react-native-size-matters";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const LessonCard = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.firstPart}>
        <TouchableOpacity>
          <Ionicons
            name="play-circle"
            color={ColorAccent.tertiary}
            size={scale(46)}
          />
        </TouchableOpacity>
        <View style={styles.lessonInfoContainer}>
          <Text style={styles.subHeading} numberOfLines={1}>
            {props.lesson.name}
          </Text>
          <Text style={styles.subText}>{props.lesson.length}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.secondPart}>
        <MaterialIcons name="lock-outline" size={scale(14)} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default LessonCard;

const styles = ScaledSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  firstPart: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  lessonInfoContainer: {
    width: "70%",
  },
  secondPart: {
    backgroundColor: ColorAccent.secondary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    padding: 6,
  },
  heading: {
    fontFamily: "Bold",
    fontSize: "14@s",
  },
  subHeading: {
    fontFamily: "Bold",
    fontSize: "11@s",
  },
  text: {
    fontFamily: "Regular",
    fontSize: "11@s",
  },
  subText: {
    fontFamily: "Regular",
    fontSize: "9@s",
  },
});
