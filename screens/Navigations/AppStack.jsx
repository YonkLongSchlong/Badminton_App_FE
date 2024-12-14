import { StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DrawerNavigation from "./DrawerNavigation";
import Schedule from "../Setting/Schedule.jsx";
import Password from "../Setting/Password.jsx";
import EditProfile from "../Setting/Profile/EditProfile.jsx";
import WatchLesson from "../Course/WatchLesson.jsx";
import { scale } from "react-native-size-matters";
import Competition from "../Sport/Competition.jsx";
import FreeCourseDetails from "../Course/FreeCourseDetails.jsx";
import { PaidCourseDetails } from "../Course/PaidCourseDetails.jsx";
import Quiz from "../Quiz/Quiz.jsx";
import PaidLesson from "../Course/PaidLesson.jsx";
import { BadmintonRules } from "../BadmintonRules/BadmintonRules.jsx";
import CoachDescription from "../Coach/CoachDescription.jsx";

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
        name="Schedule"
        component={Schedule}
        options={() => ({
          headerTitleAlign: "center",
          headerTitle: "Schedule",
          headerShadowVisible: false,
          headerTitleStyle: {
            fontFamily: "Bold",
            fontSize: scale(14),
          },
        })}
      />
      <Stack.Screen
        name="Password"
        component={Password}
        options={() => ({
          headerTitleAlign: "center",
          headerTitle: "Password",
          headerShadowVisible: false,
          headerTitleStyle: {
            fontFamily: "Bold",
            fontSize: scale(14),
          },
        })}
      />
      <Stack.Screen
        name="WatchLesson"
        component={WatchLesson}
        options={(props) => ({
          headerTitleAlign: "center",
          headerTitle: "Watch Lesson",
          headerShadowVisible: false,
          headerTitleStyle: {
            fontFamily: "Bold",
            fontSize: scale(13),
          },
        })}
      />
      <Stack.Screen
        name="PaidLesson"
        component={PaidLesson}
        options={(props) => ({
          headerTitleAlign: "center",
          headerTitle: "Watch Lesson",
          headerShadowVisible: false,
          headerTitleStyle: {
            fontFamily: "Bold",
            fontSize: scale(13),
          },
        })}
      />
      <Stack.Screen
        name="FreeCourseDetails"
        component={FreeCourseDetails}
        options={(props) => ({
          headerTitleAlign: "center",
          headerTitle: "Course Details",
          headerShadowVisible: false,
          headerTitleStyle: {
            fontFamily: "Bold",
            fontSize: scale(13),
          },
        })}
      />
      <Stack.Screen
        name="PaidCourseDetails"
        component={PaidCourseDetails}
        options={(props) => ({
          headerTitleAlign: "center",
          headerTitle: "Course Details",
          headerShadowVisible: false,
          headerTitleStyle: {
            fontFamily: "Bold",
            fontSize: scale(13),
          },
        })}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={() => ({
          headerTitleAlign: "center",
          headerTitle: "Edit Profile",
          headerShadowVisible: false,
          headerTitleStyle: {
            fontFamily: "Bold",
            fontSize: scale(14),
          },
        })}
      />
      <Stack.Screen
        name="Quiz"
        component={Quiz}
        options={() => ({
          headerTitleAlign: "center",
          headerTitle: "Quiz",
          headerShadowVisible: false,
          headerTitleStyle: {
            fontFamily: "Bold",
            fontSize: scale(14),
          },
        })}
      />
      <Stack.Screen
        name="CoachDescription"
        component={CoachDescription}
        options={() => ({
          headerTitleAlign: "center",
          headerTitle: "Coach Description",
          headerShadowVisible: false,
          headerTitleStyle: {
            fontFamily: "Bold",
            fontSize: scale(14),
          },
        })}
      />
      <Stack.Screen
        name="Competition"
        component={Competition}
        options={() => ({
          header: () => null,
        })}
      />
    </Stack.Navigator>
  );
};

export default AppStack;

const styles = StyleSheet.create({});
