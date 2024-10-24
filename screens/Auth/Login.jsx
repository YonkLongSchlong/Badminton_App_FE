import { Text, TouchableOpacity, View, ImageBackground, Alert } from "react-native";
import React, {useContext, useEffect} from "react";
import { ScaledSheet } from "react-native-size-matters";
import ColorAccent from "../../constant/Color.js";
import { useForm } from "react-hook-form";
import FormField from "../../components/Input/FormField";
import { emailRegex, passwordRegex } from "../../constant/Regex";
import { login, resetState } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import AuthContext from "../../context/AuthContext.js";

const Login = ({ navigation }) => {
  const { control, handleSubmit } = useForm();
  const {storeAuthData} = useContext(AuthContext);
  const dispatch = useDispatch();

  const handleLogin = (data) => {
    const user = {
      ...data,
      role: "user",
    };
    dispatch(login(user));
  };

  const {message} = useSelector((state) => state?.auth);

  const userState = useSelector((state) => state?.auth?.user);

  useEffect(() => {
    if (message === "Login successful") {
      storeAuthData(userState.person,userState.token);
      Alert.alert("Login successful");
    } else if (message === "Login fail") {
      Alert.alert("Invalid email or password");
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
        <Text style={styles.headerText}>Welcome back!</Text>
        <Text style={styles.subHeaderText}>Let's get you back on track</Text>
      </View>

      <View style={styles.form}>
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
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't you have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.signInText}>SIGN UP</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.signinButton}
          onPress={handleSubmit(handleLogin)}
        >
          <Text style={styles.signinButtonText}>Sign in</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
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
    backgroundColor: ColorAccent.primary,
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
    textDecorationLine: "underline",
  },
});
