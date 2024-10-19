import { Text, TouchableOpacity, View, ImageBackground, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { ScaledSheet } from "react-native-size-matters";
import ColorAccent from "../../constant/Color.js";
import { useForm } from "react-hook-form";
import FormField from "../../components/Input/FormField";
import { emailRegex, passwordRegex, usernameRegex } from "../../constant/Regex";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, resetState } from "../../features/auth/authSlice.js";

const Register = ({ navigation }) => {
  const { control, handleSubmit, watch } = useForm();
  const [registerData, setRegisterData] = useState(null);

  const pwd = watch("password");
  const dispatch = useDispatch();

  const handleRegister = (data) => {
    const { confirmPassword, ...registerData } = data;
    registerData.role = "user";
    setRegisterData(registerData);
    dispatch(registerUser(registerData));
  };

  const { message } = useSelector((state) => state?.auth);
  console.log("Message:",message);

  useEffect(() => {
    if (message === "OTP sent to email successfully") {
      Alert.alert("OTP sent to email successfully");
      navigation.navigate("VerifyOTP", { registerData })
    } else if (message === "Failed to send OTP") {
      Alert.alert("Failed to send OTP");
      dispatch(resetState());
    }
  }, [message, dispatch]);


  return (
    <ImageBackground
      source={require("../../assets/background.png")}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>Let's get started !</Text>
        <Text style={styles.subHeaderText}>
          Create an account to start your journey
        </Text>
      </View>

      <View style={styles.form}>
        <FormField
          control={control}
          name="user_name"
          label="User name"
          rules={{
            required: "Please enter your user name",
            maxLength: {
              value: 24,
              message: "Username can't be longer than 24 characters",
            },
            pattern: {
              value: usernameRegex,
              message: "Username can't not contain special characters",
            },
          }}
        />
        <FormField
          control={control}
          name="email"
          label="Email"
          rules={{
            required: "Please enter your Email",
            pattern: {
              value: emailRegex,
              message: "Invalid email",
            },
          }}
        />
        <FormField
          control={control}
          name="password"
          label="Password"
          rules={{
            required: "Please enter your password",
            maxLength: {
              value: 24,
              message: "Password can't be longer than 24 characters",
            },
            pattern: {
              value: passwordRegex,
              message:
                "Password must contain at least 8 characters, an uppercase, a number and special characters",
            },
          }}
          secure={true}
        />
        <FormField
          control={control}
          name="confirmPassword"
          label=" Confirm password"
          rules={{
            required: "Please enter confirm password",
            validate: (value) =>
              value === pwd || "Confirm password does not match",
          }}
          secure={true}
        />
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.signInText}>SIGN IN</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.signinButton}
          onPress={handleSubmit(handleRegister)}
        >
          <Text style={styles.signinButtonText}>Register</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.instructorLoginText}>Login as instructor</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default Register;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorAccent.tertiary,
    justifyContent: "center",
    padding: 20,
  },
  header: {
    marginBottom: 30,
  },
  headerText: {
    fontSize: "40@s",
    color: ColorAccent.primary,
    fontFamily: "Caveat-Bold",
  },
  subHeaderText: {
    fontFamily: "Regular",
    color: ColorAccent.primary,
  },
  form: {
    backgroundColor: ColorAccent.secondary,
    padding: 20,
    borderRadius: 20,
  },
  signinButton: {
    backgroundColor: ColorAccent.tertiary,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    width: "120@s",
  },
  signinButtonText: {
    color: ColorAccent.primary,
    fontSize: "16@s",
    fontFamily: "Bold",
  },
  footer: {
    flexDirection: "row",
    marginTop: 10,
  },
  footerText: {
    fontSize: "12@s",
  },
  signInText: {
    color: ColorAccent.tertiary,
    marginLeft: 5,
    textDecorationLine: "underline",
  },
  instructorLoginText: {
    fontSize: "12@s",
    textAlign: "center",
    marginTop: 10,
    textDecorationLine: "underline",
  },
  // textInput: {
  //   borderRadius: "10@s",
  //   paddingVertical: "8@s",
  //   paddingHorizontal: "10@s",
  //   marginBottom: "15@s",
  //   fontSize: "14@s",
  //   backgroundColor: ColorAccent.primary,
  // },
  // label: {
  //   fontSize: '14@s',
  //   color: '#333',
  //   marginBottom: 5
  // },
});
