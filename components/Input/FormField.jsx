import { View, TextInput, Text } from "react-native";
import React from "react";
import { Controller } from "react-hook-form";
import ColorAccent from "../../constant/Color.js";
import { ScaledSheet } from "react-native-size-matters";

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
                secureTextEntry={secure}
                multiline={multiline}
                numberOfLines={numberoflines}
              />
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
    marginBottom: 20,
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
    justifyContent: 'center',
  },
  textInput: {
    paddingVertical: 10,
    width: '100%',
    backgroundColor: ColorAccent.primary,
    textAlignVertical: "top",
  },
  errorText: {
    color: 'red',
    marginTop: 5,
    textAlign: 'right',
  },
});
