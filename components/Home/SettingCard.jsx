import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { scale, ScaledSheet } from "react-native-size-matters";
import Ionicons from "@expo/vector-icons/Ionicons";

const SettingCard = (props) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.firstPart}>
        <Ionicons name={props.icon} size={scale(22)} />
        <Text style={styles.text}>{props.label}</Text>
      </View>
      <View>
        <Ionicons name="chevron-forward" size={scale(22)} />
      </View>
    </TouchableOpacity>
  );
};

export default SettingCard;

const styles = ScaledSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  firstPart: {
    flexDirection: "row",
    alignItems: "center",
    flexDirection: "row",
    gap: 30,
  },
  text: {
    fontFamily: "Bold",
    fontSize: "13@s",
  },
});
