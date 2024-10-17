import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { scale, ScaledSheet } from "react-native-size-matters";
import Ionicons from "@expo/vector-icons/Ionicons";

const SettingCard = ({ icon, label, onPress, last }) => {
  // const handlePress = () => {
  //   if (props.label === "Schedule") {
  //     props.navigation.navigate("Schedule");
  //   }else if(props.label === "Password") {
  //     props.navigation.navigate("Password");
  //   }else if(props.label === "Profile") {
  //     props.navigation.navigate("MyProfile");
  //   }
  // };

  return (
    <>
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <View style={styles.firstPart}>
          <Ionicons name={icon} size={scale(18)} />
          <Text style={styles.text}>{label}</Text>
        </View>
      </TouchableOpacity>
      {!last ? <View style={styles.separator} /> : null}
    </>
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
    fontSize: "11@s",
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "black",
  },
});
