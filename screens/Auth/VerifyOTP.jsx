import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import InputField from "../../components/Input/InputField.jsx";
import Color from "../../constant/Color.js";
import { otpRules } from "../../utils/inputRules.js";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { errorToast, successToast } from "../../utils/toastConfig.js";
import otp from "../../hooks/Auth/otpHooks.js";
import userStore from "../../store/userStore.js";

export default VerifyOTP = ({ navigation, route }) => {
  const { email } = route.params;
  const { control, handleSubmit } = useForm();
  const setUser = userStore((state) => state.setUser);
  const setToken = userStore((state) => state.setToken);

  const otpMutation = useMutation({
    mutationFn: otp,
    onSuccess: async (data) => {
      if (data.status === 400 || data.status === 404) {
        errorToast(data.msg);
      } else {
        await setUser(data.data.user);
        await setToken(data.data.token);
        successToast("OTP authenticate", data.msg);
      }
    },
    onError: (data) => {
      console.log(data.message);

      errorToast(data.message);
    },
  });

  const handleVerifyOtp = ({ otp }) => {
    otpMutation.mutate({ email, otp });
  };

  return (
    <>
      <View style={styles.background} />
      <View style={styles.container}>
        {/* ----------- HEADER ----------- */}
        <View style={styles.headerWrapper}>
          <Text style={styles.header}>Let's get started!</Text>
          <Text style={styles.subHeader}>Enter your OTP to login</Text>
        </View>

        {/* ----------- OTP FORM ----------- */}
        <View style={styles.loginWrapper}>
          <InputField
            name={"otp"}
            control={control}
            placeholder={"Enter your OTP"}
            label={"OTP"}
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
    alignItems: "center",
    paddingTop: 30,
    paddingHorizontal: 35,
  },
  background: {
    position: "absolute",
    height: "55%",
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
