import { Text, TouchableOpacity, View, ImageBackground } from "react-native";
import React from "react";
import { ScaledSheet } from "react-native-size-matters";
import ColorAccent from "../../constant/Color.js";
import { useForm } from "react-hook-form";
import TextInput from "../../components/Input/TextInput";

const Register = ({ navigation }) => {
  const { control } = useForm();

  return (
    <ImageBackground source={require('../../assets/background.png')} style={styles.container} resizeMode="cover">
      <View style={styles.header}>
        <Text style={styles.headerText}>Let's get started !</Text>
        <Text style={styles.subHeaderText}>Create an account to start your journey</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>User name</Text>
        <TextInput
          name="User name"
          control={control}
          rules={{ required: "Please enter your user name" }}
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          name="Email"
          control={control}
          rules={{ required: "Please enter your email" }}
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          name="Password"
          control={control}
          rules={{ required: "Please enter your password" }}
          secure={true}
        />
        <Text style={styles.label}>Confirm password</Text>
        <TextInput
          name="ConfrimPassword"
          control={control}
          rules={{ required: "Please enter your confirm password" }}
          secure={true}
        />
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.signInText}>SIGN IN</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.signinButton}>
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
