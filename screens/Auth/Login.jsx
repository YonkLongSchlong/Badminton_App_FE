import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { ScaledSheet } from "react-native-size-matters";
import { useForm } from "react-hook-form";
import InputField from "../../components/Input/InputField.jsx";
import { emailRules, passwordRules } from "../../utils/inputRules.js";
import Color from "../../constant/Color.js";
import { useMutation } from "@tanstack/react-query";
import { errorToast, successToast } from "../../utils/toastConfig.js";
import login from "../../hooks/Auth/loginHooks.js";
import { StatusBar } from "expo-status-bar";

export default Login = ({ navigation }) => {
  const { control, handleSubmit } = useForm();
  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data, variables) => {
      if (data.status === 400 || data.status === 404) {
        errorToast(data.msg);
      } else {
        navigation.navigate("VerifyOTP", { email: variables.email });
        successToast("OTP authenticate", data.msg);
      }
    },
    onError: (data) => {
      errorToast(data.message);
    },
  });

  const handleLogin = ({ email, password }) => {
    loginMutation.mutate({ email, password });
  };

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.background} />
      <View style={styles.container}>
        {/* ----------- HEADER ----------- */}
        <View style={styles.headerWrapper}>
          <Text style={styles.header}>Welcome back!</Text>
          <Text style={styles.subHeader}>Let's get you back on track</Text>
        </View>

        {/* ----------- LOGIN FORM ----------- */}
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

          <View style={styles.registerLinkWrapper}>
            <Text style={styles.registerText}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={styles.registerLink}>SIGN UP</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.loginBtnWrapper}>
            <TouchableOpacity
              style={styles.loginBtn}
              onPress={handleSubmit(handleLogin)}
            >
              <Text style={styles.loginText}>Log in</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ----------- BOTTOM LINKS ----------- */}
        <View style={styles.bottomLinkWrapper}>
          <TouchableOpacity
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text style={styles.bottomLink}>Forgot your password?</Text>
          </TouchableOpacity>
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
    height: "54%",
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
