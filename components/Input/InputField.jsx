import { useState } from "react";
import { Controller } from "react-hook-form";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ScaledSheet } from "react-native-size-matters";
import Color from "../../constant/Color";

export default function InputField({
  name,
  control,
  rules,
  placeholder,
  label,
  secure,
}) {
  const [isVisible, setIsVisible] = useState(secure);

  return (
    <View style={styles.inputWrapper}>
      <Text style={styles.label}>{label}</Text>
      <Controller
        control={control}
        rules={rules}
        name={name}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <View>
            <TextInput
              style={styles.textInput}
              placeholder={placeholder}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry={isVisible}
            />
            {secure && (
              <TouchableOpacity
                style={styles.iconBtn}
                onPress={() => setIsVisible(!isVisible)}
              >
                <Ionicons
                  name={!isVisible ? "eye-off" : "eye"}
                  size={20}
                  color={Color.non_font}
                />
              </TouchableOpacity>
            )}
            {error && <Text style={styles.errorText}>{error.message}</Text>}
          </View>
        )}
      />
    </View>
  );
}

const styles = ScaledSheet.create({
  inputWrapper: {
    flexDirection: "column",
    justifyContent: "center",
    gap: 10,
    width: "100%",
    marginBottom: 15,
  },
  label: {
    paddingLeft: 4,
    fontFamily: "Bold",
  },
  textInput: {
    fontFamily: "Medium",
    backgroundColor: "white",
    borderRadius: 10,
    padding: "10@s",
    fontSize: "11@s",
  },
  errorText: {
    marginTop: 7,
    fontFamily: "Medium",
    color: "red",
    paddingLeft: 4,
    textAlign: "left",
    fontSize: "10@s",
  },
  iconBtn: {
    position: "absolute",
    zIndex: 9999,
    right: "10@s",
    top: "12@s",
  },
});
