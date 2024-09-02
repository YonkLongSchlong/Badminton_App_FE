import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { ScaledSheet } from "react-native-size-matters";
import ColorAccent from "../../constant/Color.js";

const CourseCategoryList = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => props.setChosenCategory(props.category.name)}
        style={styles.nameContainer}
      >
        <Text
          style={
            props.chosenCategory == props.category.name
              ? styles.textSelected
              : styles.textNonSelected
          }
        >
          {props.category.name}
        </Text>
      </TouchableOpacity>
      <View
        style={
          props.chosenCategory == props.category.name ? styles.underline : null
        }
      ></View>
    </View>
  );
};

export default CourseCategoryList;

const styles = ScaledSheet.create({
  container: {
    width: "full",
    gap: 3,
  },
  textSelected: {
    fontFamily: "Bold",
    fontSize: "12@s",
  },
  textNonSelected: {
    fontFamily: "Bold",
    fontSize: "12@s",
    color: ColorAccent.non_font,
  },
  underline: {
    backgroundColor: ColorAccent.tertiary,
    height: 3,
  },
  nameContainer: {
    alignItems: "center",
    paddingHorizontal: 10,
  },
});
