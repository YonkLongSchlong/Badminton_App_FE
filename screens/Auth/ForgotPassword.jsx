import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import ColorAccent from "../../constant/Color.js";
import { useForm } from "react-hook-form";
import { emailRegex } from "../../constant/Regex.js";

const ForgotPassword = ({ navigation }) => {
  return (
    <>
      <View style={styles.background} />
      <View style={styles.container}>
        {/* ----------- HEADER ----------- */}
        <View style={styles.headerWrapper}>
          <Text style={styles.header}>Let's get started!</Text>
          <Text style={styles.subHeader}>Enter your OTP to login</Text>
        </View>

        {/* ----------- EMAIL FORM ----------- */}
        <View style={styles.loginWrapper}>
          <InputField
            name={"email"}
            control={control}
            placeholder={"Enter your email"}
            label={"Email"}
            rules={otpRules}
            secure={false}
          />

          <View style={styles.registerLinkWrapper}>
            <Text style={styles.registerText}>Didn't receive a otp?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.registerLink}>RESEND OTP</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.loginBtnWrapper}>
            <TouchableOpacity
              style={styles.loginBtn}
              onPress={handleSubmit(handleVerifyOtp)}
            >
              <Text style={styles.loginText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
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
