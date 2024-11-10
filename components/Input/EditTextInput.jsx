import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Color from "../../constant/Color";
import { ScaledSheet } from "react-native-size-matters";

export default function EditTextInput({ label, ecrypted, value, setValue, editable }) {
  const [isFocus, setIsFocus] = useState(false);

  const onFocus = () => {
    setIsFocus(true);
  };

  const onBlur = () => {
    setIsFocus(false);
  };

  return (
    <View style={styles.textInputContainer}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        style={[isFocus ? styles.textInputFocus : styles.textInput, ,]}
        secureTextEntry={ecrypted}
        value={value}
        onFocus={onFocus}
        onBlur={onBlur}
        onChangeText={(text) => setValue(text)}
        editable={editable}
      />
      {label == "Password" ? (
        <Text style={styles.notifyText}>
          Please enter your password to cotinue *
        </Text>
      ) : label == "Confirm new password" ? (
        <Text style={styles.notifyText}>
          Please confirm your new password to update *
        </Text>
      ) : null}
    </View>
  );
}

const styles = ScaledSheet.create({
  textInputContainer: {
    marginBottom: 0,
  },
  label: {
    paddingLeft: 4,
    fontFamily: "Bold",
    marginBottom: 5,
  },
  textInput: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Color.black,
    borderRadius: 10,
    width: "100%",
    padding: "10@s",
    fontFamily: "Medium",
    fontSize: "11@s",
    backgroundColor: "white",
  },
  textInputFocus: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Color.tertiary,
    borderRadius: 10,
    width: "100%",
    padding: "10@s",
    fontFamily: "Medium",
    fontSize: "10@s",
    backgroundColor: "white",
  },
  notifyText: {
    marginTop: 7,
    fontFamily: "Medium",
    color: "red",
    paddingLeft: 4,
    textAlign: "left",
    fontSize: "10@s",
  },
});
