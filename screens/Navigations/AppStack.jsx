import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DrawerNavigation from "./DrawerNavigation";
import CourseDetails from "../Home/CourseDetails.jsx";
import Schedule from "../Setting/Schedule.jsx";
import Password from "../Setting/Password.jsx";
import MyProfile from "../Setting/Profile/MyProfile.jsx";
import EditProfile from "../Setting/Profile/EditProfile.jsx";
import AddCourse from "../Home/AddCourse.jsx";
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
        options={(props) => ({
          headerTitleAlign: "center",
          // headerBackVisible: false,
          headerTitle: props.route.params.course.name,
          // headerTitle: "",
          headerShadowVisible: false,

          headerTitleStyle: {
            fontFamily: "Bold",
            fontSize: scale(13),
          },
        })}
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
        name="AddCourse"
        component={AddCourse}
        options={() => ({
          headerTitleAlign: "center",
          headerTitle: "Add Course",
          headerShadowVisible: false,
          headerTitleStyle: {
            fontFamily: "Bold",
            fontSize: scale(14),
          },
        })}
      />
      
      <Stack.Screen
        name="MyProfile"
        component={MyProfile}
        options={() => ({
          headerTitleAlign: "center",
          headerTitle: "My Profile",
          headerShadowVisible: false,
          headerTitleStyle: {
            fontFamily: "Bold",
            fontSize: scale(14),
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
    </Stack.Navigator>
  );
};

export default AppStack;

const styles = StyleSheet.create({});
