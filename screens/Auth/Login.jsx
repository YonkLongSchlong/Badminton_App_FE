import { Text, TextInput, TouchableOpacity, View } from "react-native";
import React from "react";
import { ScaledSheet } from "react-native-size-matters";

const Login = ({navigation}) => {
  return (
    <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.headerText}>Welcome back!</Text>
      <Text style={styles.subHeaderText}>Let's get you back on track</Text>
    </View>

    <View style={styles.form}>
      <TextInput placeholder="Username" style={styles.input} keyboardType="default"/>
      <TextInput placeholder="Password" style={styles.input} secureTextEntry />

      <TouchableOpacity style={styles.registerButton}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't you have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.signInText}>SIGN UP</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.instructorLoginText}>Forgot your password?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.instructorLoginText}>Login as instructor</Text>
      </TouchableOpacity>
    </View>
  </View>
  );
};

export default Login;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f47c7c",
    justifyContent: "center",
    padding: 20,
  },
  header: {
    marginBottom: 30,
    alignItems: "center",
  },
  headerText: {
    fontSize: 28,
    color: "#FFF",
    fontWeight: "bold",
  },
  subHeaderText: {
    fontSize: 16,
    color: "#FFF",
  },
  form: {
    backgroundColor: "#f5f5f5",
    padding: 20,
    borderRadius: 10,
  },
  input: {
    backgroundColor: "#FFF",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    fontSize: 16,
    marginBottom: 15,
  },
  registerButton: {
    backgroundColor: "#f47c7c",
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  registerButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  footerText: {
    fontSize: 14,
    color: "#333",
  },
  signInText: {
    fontSize: 14,
    color: "#f47c7c",
    marginLeft: 5,
  },
  instructorLoginText: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
    marginTop: 20,
  },
});
