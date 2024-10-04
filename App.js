import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import "./gesture-handler";
import NavigationWrapper from "./screens/Navigations/NavigationWrapper";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./app/store";


export default function App() {
  const [loaded, error] = useFonts({
    "Caveat-Bold": require("./assets/fonts/Caveat-Bold.ttf"),
    Light: require("./assets/fonts/Quicksand-Light.ttf"),
    Regular: require("./assets/fonts/Quicksand-Regular.ttf"),
    Medium: require("./assets/fonts/Quicksand-Medium.ttf"),
    Semibold: require("./assets/fonts/Quicksand-SemiBold.ttf"),
    Bold: require("./assets/fonts/Quicksand-Bold.ttf"),
  });

  // useEffect(() => {
  //   if (loaded || error) {
  //     SplashScreen.hideAsync();
  //   }
  // }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationWrapper />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
