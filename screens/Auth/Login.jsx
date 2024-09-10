import { Text, TouchableOpacity, View, ImageBackground } from "react-native";
import React from "react";
import { ScaledSheet } from "react-native-size-matters";
import ColorAccent from "../../constant/Color.js";
import { useForm } from "react-hook-form";
import TextInput from "../../components/Input/TextInput";

const Login = ({ navigation }) => {
  const { control } = useForm();

  return (
    <ImageBackground source={require('../../assets/background.png')} style={styles.container} resizeMode="cover">
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome back!</Text>
        <Text style={styles.subHeaderText}>Let's get you back on track</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>User name</Text>
        <TextInput
          name="User name"
          control={control}
          rules={{ required: "Please enter your user name" }}
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          name="Password"
          control={control}
          rules={{ required: "Please enter your password" }}
          secure={true}
        />
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't you have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.signInText}>SIGN UP</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.signinButton}>
          <Text style={styles.signinButtonText}>Sign in</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.instructorLoginText}>Forgot your password?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.instructorLoginText}>Login as instructor</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default Login;

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
    marginTop: 20,
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
    textDecorationLine: "underline"
  },
});
