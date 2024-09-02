import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DrawerNavigation from "./DrawerNavigation";
import CourseDetails from "../Home/CourseDetails.jsx";
import { scale } from "react-native-size-matters";

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DrawerNavigation"
        component={DrawerNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CourseDetails"
        component={CourseDetails}
        options={{
          headerTitleAlign: "center",
          headerTitle: "Course Details",
          headerShadowVisible: false,

          headerTitleStyle: {
            fontFamily: "Bold",
            fontSize: scale(16),
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;

const styles = StyleSheet.create({});
