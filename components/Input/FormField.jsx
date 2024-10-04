import { View, TextInput, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { ScaledSheet } from "react-native-size-matters";
import { Ionicons } from "@expo/vector-icons"; 
import ColorAccent from "../../constant/Color.js";

export default function FormField({ 
  control, 
  name, 
  rules, 
  placeholder, 
  secure, 
  label, 
  numberoflines,
  multiline,
  showAsterisk = false 
}) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.wrapper}>
      {label && (
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{label}</Text>
          {showAsterisk && <Text style={styles.asterisk}>*</Text>}
        </View>
      )}
      <Controller
        control={control}
        name={name}
        rules={rules}
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
                placeholder={placeholder}
                secureTextEntry={secure && !isPasswordVisible}
                multiline={multiline}
                numberOfLines={numberoflines}
              />
              {secure && (
                <TouchableOpacity
                  style={styles.iconContainer}
                  onPress={togglePasswordVisibility}
                >
                  <Ionicons
                    name={isPasswordVisible ? "eye-off" : "eye"}
                    size={20}
                    color={ColorAccent.secondary}
                  />
                </TouchableOpacity>
              )}
            </View>
            {error && <Text style={styles.errorText}>{error.message}</Text>}
          </>
        )}
      />
    </View>
  );
}

const styles = ScaledSheet.create({
  wrapper: {
    marginBottom: 10,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  label: {
    fontSize: '14@s',
    color: '#333',
  },
  asterisk: {
    color: 'red',
    marginLeft: 5,
  },
  container: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: ColorAccent.primary,
  },
  textInput: {
    paddingTop: 10,
    paddingBottom: 5,
    flex: 1,
    backgroundColor: ColorAccent.primary,
    textAlignVertical: "top",
  },
  iconContainer: {
    padding: 5,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
    textAlign: 'left',
  },
});
