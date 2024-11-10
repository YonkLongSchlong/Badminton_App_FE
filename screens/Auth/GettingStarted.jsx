import { Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { ScaledSheet } from "react-native-size-matters";
import ColorAccent from "../../constant/Color.js";
import AntDesign from "@expo/vector-icons/AntDesign";
import { StatusBar } from "expo-status-bar";

const GettingStarted = ({ navigation }) => {
  return (
    <View style={styles.container}>
       <StatusBar style="dark" />
      <Text style={styles.title}>Court Companion</Text>

      <Image
        source={require("../../assets/badminton-player.png")}
        style={styles.image}
      />

      <Text style={styles.subtitle}>
        Let us ignite your passion and help you to become a better player
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Register")}
      >
        <AntDesign name="arrowright" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default GettingStarted;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    paddingHorizontal: 25,
  },
  title: {
    fontSize: "40@s",
    fontFamily: "Caveat-Bold",
    marginBottom: 20,
  },
  image: {
    width: "250@s",
    height: "250@s",
    resizeMode: "cover",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: "13@s",
    textAlign: "center",
    marginVertical: 40,
    fontFamily: "Semibold",
  },
  button: {
    width: "52@s",
    height: "52@s",
    borderRadius: 30,
    overflow: "hidden",
    backgroundColor: ColorAccent.tertiary,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: "24@s",
    color: ColorAccent.primary,
  },
});
