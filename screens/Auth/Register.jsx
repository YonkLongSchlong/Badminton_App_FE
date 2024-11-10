import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { ScaledSheet } from "react-native-size-matters";
import { useForm } from "react-hook-form";
import Color from "../../constant/Color.js";
import InputField from "../../components/Input/InputField.jsx";
import { emailRules, passwordRules } from "../../utils/inputRules.js";
import { useMutation } from "@tanstack/react-query";
import register from "../../hooks/Auth/registerHooks.js";
import { errorToast, successToast } from "../../utils/toastConfig.js";
import { StatusBar } from "expo-status-bar";

export default Register = ({ navigation }) => {
  const { control, handleSubmit } = useForm();
  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      if (data.status === 400 || data.status === 404) {
        errorToast(data.msg);
      } else {
        navigation.navigate("Login");
        successToast("Account create successfully", data.msg);
      }
    },
    onError: (data) => {
      errorToast(data.message);
    },
  });

  const handleRegister = async ({ email, password }) => {
    registerMutation.mutate({ email, password });
  };

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.background} />
      <View style={styles.container}>
        {/* ----------- HEADER ----------- */}
        <View style={styles.headerWrapper}>
          <Text style={styles.header}>Let's get started!</Text>
          <Text style={styles.subHeader}>
            Create an account and start your journey
          </Text>
        </View>

        {/* ----------- REGISTER FORM ----------- */}
        <View style={styles.loginWrapper}>
          <InputField
            name={"email"}
            control={control}
            placeholder={"Enter your email"}
            label={"Email"}
            rules={emailRules}
            secure={false}
          />
          <InputField
            name={"password"}
            control={control}
            placeholder={"Enter your password"}
            label={"Password"}
            rules={passwordRules}
            secure={true}
          />
          <InputField
            name={"confirmPassword"}
            control={control}
            placeholder={"Confirm your password"}
            label={"Confirm password"}
            rules={passwordRules}
            secure={true}
          />

          <View style={styles.registerLinkWrapper}>
            <Text style={styles.registerText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.registerLink}>SIGN IN</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.loginBtnWrapper}>
            <TouchableOpacity
              style={styles.loginBtn}
              onPress={handleSubmit(handleRegister)}
            >
              <Text style={styles.loginText}>Register</Text>
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
    alignItems: "center",
    paddingHorizontal: 35,
  },
  background: {
    position: "absolute",
    height: "57%",
    width: "100%",
    backgroundColor: Color.tertiary,
    borderBottomRightRadius: 100,
    borderBottomLeftRadius: 100,
  },
  headerWrapper: {
    width: "100%",
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: 50,
  },
  header: {
    width: "100%",
    fontFamily: "Caveat-Bold",
    fontSize: "32@s",
    color: "white",
  },
  subHeader: {
    fontFamily: "Medium",
    fontSize: "11@s",
    paddingLeft: 5,
    color: "white",
  },
  loginWrapper: {
    flexDirection: "column",
    backgroundColor: Color.secondary,
    width: "100%",
    borderRadius: 20,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  registerLinkWrapper: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  registerText: {
    fontFamily: "Semibold",
    fontSize: "10@s",
  },
  registerLink: {
    fontFamily: "Bold",
    color: Color.tertiary,
    textDecorationLine: "underline",
    fontSize: "10@s",
  },
  loginBtnWrapper: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  loginBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: "25@s",
    paddingVertical: "10@vs",
    borderRadius: 10,
    backgroundColor: Color.tertiary,
  },
  loginText: {
    fontFamily: "Bold",
    color: "white",
  },
  bottomLinkWrapper: {
    marginTop: 20,
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
  },
  bottomLink: {
    fontFamily: "Bold",
    textDecorationLine: "underline",
    fontSize: "10@s",
  },
});
