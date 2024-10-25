import React from "react";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import ColorAccent from "../../constant/Color.js";
import FormField from "../../components/Input/FormField";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  resetPassword,
} from "../../features/auth/authSlice.js";
import { otpRegex, passwordRegex } from "../../constant/Regex.js";

const ResetPassword = ({ navigation, route }) => {
  const { forgotPasswordData } = route.params;
  const { control, handleSubmit } = useForm();

  const dispatch = useDispatch();

  const handleResetPassword = (dataForm) => {
    const data = {
      ...dataForm,
      ...forgotPasswordData,
    };
    dispatch(resetPassword(data))
      .unwrap()
      .then(() => {
        Alert.alert(
          "Successful",
          "Your password has been reset successfully.",
          [
            {
              text: "OK",
              onPress: () => navigation.navigate("Login"),
            },
          ]
        );
      })
      .catch((error) => {
        if (error === "Request failed with status code 400") {
          Alert.alert(
            "Invalid credentials",
            "The OTP you entered is incorrect. Please try again."
          );
        } else if (error === "Request failed with status code 404") {
          Alert.alert(
            "User Not Found",
            "No account associated with this information was found. Please check and try again."
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
      <Text style={styles.title}>Reset Password</Text>
      <Text style={styles.subtitle}>
        We have sent you an One Time PassCode to your email address:
      </Text>
      <Text style={styles.email}>
        {forgotPasswordData?.email || "mail@gmail.com"}
      </Text>

      <View style={styles.formContainer}>
        <FormField
          name="otp"
          control={control}
          placeholder="Enter otp you received"
          rules={{
            required: "Please enter otp you received",
            pattern: {
              value: otpRegex,
              message: "OTP must contain 6 numbers",
            },
          }}
          style={styles.input}
        />
        <FormField
          name="newPassword"
          control={control}
          placeholder="Enter your new password"
          rules={{
            required: "Please enter your new password",
            maxLength: {
              value: 24,
              message: "New password can't be longer than 24 characters",
            },
            pattern: {
              value: passwordRegex,
              message:
                "New password must contain at least 8 characters, an uppercase, a number and special characters",
            },
          }}
          style={styles.input}
        />
      </View>

      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit(handleResetPassword)}
      >
        <Text style={styles.submitText}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  email: {
    fontSize: "16@s",
    fontWeight: "bold",
    color: ColorAccent.tertiary,
    marginBottom: "20@s",
  },
});

export default ResetPassword;
