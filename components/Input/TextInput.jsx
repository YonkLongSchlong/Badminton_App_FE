import { View, TextInput, Text } from "react-native";
import React from "react";
import { Controller } from "react-hook-form";
import ColorAccent from "../../constant/Color.js";
import { ScaledSheet } from "react-native-size-matters";


export default function CustomTextInput(props) {
  return (
    <Controller
      control={props.control}
      name={props.name}
      rules={props.rules}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <>
          <View
            style={[
              styles.container,
              { borderColor: error ? "red" : ColorAccent.secondary },
            ]}
          >
            <TextInput
              style={styles.textInput}
              value={value}
              onChangeText={onChange}
              placeholder={props.placeholder}
              secureTextEntry={props.secure}
            />
          </View>
          {error && <Text style={styles.errorText}>{error.message}</Text>}
        </>
      )}
    />
  );
}

const styles = ScaledSheet.create({
  container: {
    marginTop: 5,
    alignItems: "center",
    borderWidth: 1,
    marginBottom: 10,
    justifyContent: "center",
  },
  textInput: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: "100%",
    backgroundColor: ColorAccent.primary,
    borderRadius: 10,
  },
  errorText: {
    color: "red",
    marginHorizontal: 2,
    marginTop: 5,
    textAlign: "right",
  },
});
