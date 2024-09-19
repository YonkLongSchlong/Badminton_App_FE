import React, { useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { ScaledSheet } from "react-native-size-matters";
import ColorAccent from "../../constant/Color.js";


const VerifyOTP = ({ navigation }) => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef(new Array(6).fill(null));

  const handleOtpChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && otp[index] === "") {
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../..//assets/otp.png")} style={styles.image} />
      <Text style={styles.title}>Enter your Verification Code</Text>
      <Text style={styles.subtitle}>
        We have sent you an One Time PassCode to your email address:
      </Text>
      <Text style={styles.email}>mail@gmail.com</Text>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            ref={(ref) => (inputRefs.current[index] = ref)}
            key={index}
            style={styles.otpInput}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleOtpChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
          />
        ))}
      </View>

      <View style={styles.wrapper}>
        <View>
          <Text style={styles.didntGetCode}>Didn't get the code?</Text>
          <TouchableOpacity style={styles.btnResend}>
            <Text style={styles.resend}>Resend Code</Text>
          </TouchableOpacity>
        </View>
        <CountdownCircleTimer
          isPlaying
          duration={150}
          colors={[ColorAccent.tertiary]}
          onComplete={() => alert("OTP Expired")}
          size={70}
        >
          {({ remainingTime }) => (
            <Text style={styles.timer}>{`${Math.floor(
              remainingTime / 60
            )}:${(remainingTime % 60).toString().padStart(2, "0")}`}</Text>
          )}
        </CountdownCircleTimer>
      </View>

      <TouchableOpacity style={styles.submitButton}  onPress={() => navigation.navigate("Login")}>
        <Text style={styles.submitText}>Verify OTP</Text>
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
  },
  title: {
    fontSize: "22@s",
    fontWeight: "bold",
    marginBottom: "10@s",
    color: "#333",
  },
  subtitle: {
    fontSize: "14@s",
    color: "#666",
    textAlign: "center",
    marginBottom: "5@s",
  },
  email: {
    fontSize: "16@s",
    fontWeight: "bold",
    color: ColorAccent.tertiary,
    marginBottom: "20@s",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "20@s",
  },
  otpInput: {
    borderWidth: 1,
    borderColor: ColorAccent.tertiary,
    width: "45@s",
    height: "45@s",
    textAlign: "center",
    fontSize: "18@s",
    marginHorizontal: "5@s",
    borderRadius: "10@s", 
    backgroundColor: ColorAccent.primary,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 5, 
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    marginBottom: "30@s",
  },
  didntGetCode: {
    fontSize: "14@s",
    color: "#888",
    marginBottom: "5@s",
  },
  btnResend:{
    borderWidth: 1,
    padding: 5,
    alignItems: "center",
    borderColor: ColorAccent.tertiary,
    borderRadius: 10
  },
  resend: {
    fontSize: "14@s",
    color: ColorAccent.tertiary,
    fontWeight: "bold",
  },
  timer: {
    fontSize: "20@s",
    color: ColorAccent.tertiary,
  },
  submitButton: {
    backgroundColor: ColorAccent.tertiary,
    padding: "12@s",
    borderRadius: "25@s", 
    width: "80%",
    alignItems: "center",
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
  },
});

export default VerifyOTP;
