import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import ColorAccent from "../../constant/Color.js";
import FormField from "../../components/Input/FormField";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../features/auth/authSlice.js";
import { emailRegex } from "../../constant/Regex.js";

const ForgotPassword = ({ navigation }) => {
  const { control, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const [forgotPasswordData, setForgotPasswordData] = useState(null);

  const handleForgotPassword = (dataForm) => {
    const data = {
      ...dataForm,
      role: "user",
    };
    setForgotPasswordData(data);
    dispatch(forgotPassword(data))
      .unwrap()
      .then(() => {
        Alert.alert(
          "Success",
          "If your email is registered, you will receive a link to reset your password shortly.",
          [
            {
              text: "OK",
              onPress: () =>
                navigation.navigate("ResetPassword", { forgotPasswordData }),
            },
          ]
        );
      })
      .catch((error) => {
        if (error === "Request failed with status code 404") {
          Alert.alert(
            "User Not Found",
            "We couldn't find an account associated with that email address. Please check and try again."
          );
        } else if (error === "Network Error") {
          Alert.alert(
            "Server Error",
            "There was a problem with the server. Please try again later."
          );
        } else {
          Alert.alert("Error", error || "An unknown error occurred.");
        }
      });
  };

  return (
    <View style={styles.container}>
      <Image source={require("../..//assets/otp.png")} style={styles.image} />
      <Text style={styles.title}>OTP Verification</Text>
      <Text style={styles.subtitle}>
        We have sent you an{" "}
        <Text style={styles.boldText}>One Time PassCode</Text> via this email
        address to reset password
      </Text>

      <View style={styles.formContainer}>
        <FormField
          name="email"
          control={control}
          placeholder="Enter your email address"
          rules={{
            required: "Please enter your email address",
            pattern: {
              value: emailRegex,
              message: "Invalid email",
            },
          }}
          style={styles.input}
        />
      </View>

      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit(handleForgotPassword)}
      >
        <Text style={styles.submitText}>Send OTP</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: ColorAccent.primary,
    paddingHorizontal: "20@s",
  },
  image: {
    width: "180@s",
    height: "180@s",
    resizeMode: "cover",
    marginBottom: "20@s",
    alignSelf: "center",
  },
  title: {
    fontSize: "22@s",
    fontWeight: "bold",
    marginBottom: "10@s",
    color: "#333",
    textAlign: "center",
  },
  subtitle: {
    fontSize: "14@s",
    color: "#666",
    textAlign: "center",
    marginBottom: "20@s",
  },
  boldText: {
    fontWeight: "bold",
  },
  formContainer: {
    width: "100%",
    paddingHorizontal: "10@s",
    marginBottom: "20@s",
  },
  submitButton: {
    backgroundColor: ColorAccent.tertiary,
    padding: "12@s",
    borderRadius: "25@s",
    width: "80%",
    alignSelf: "center",
    shadowColor: ColorAccent.tertiary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 6,
  },
  submitText: {
    color: ColorAccent.primary,
    fontSize: "18@s",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ForgotPassword;
