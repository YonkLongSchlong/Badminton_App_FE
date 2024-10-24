import { StyleSheet } from "react-native";
import React, {useEffect} from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DrawerNavigation from "./DrawerNavigation";
import CourseDetails from "../Course/CourseDetails.jsx";
import Schedule from "../Setting/Schedule.jsx";
import Password from "../Setting/Password.jsx";
import MyProfile from "../Setting/Profile/MyProfile.jsx";
import EditProfile from "../Setting/Profile/EditProfile.jsx";
import AddCourse from "../Course/AddCourse.jsx";
import AddLesson from "../Course/AddLesson.jsx";
import WatchLesson from "../Course/WatchLesson.jsx";
import PublicCourse from "../Course/PublicCourse.jsx";
import { scale } from "react-native-size-matters";
import { useDispatch } from "react-redux";
import { loadUserFromSecureStore } from "../../features/user/userSlice.js";

const Stack = createNativeStackNavigator();

const AppStack = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUserFromSecureStore());
  }, [dispatch]);


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
          headerTitle: props.route.params.course.name,
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
        name="AddLesson"
        component={AddLesson}
        options={() => ({
          headerTitleAlign: "center",
          headerTitle: "Add Lesson",
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
          headerTitle: props.route.params.lesson.name,
          headerShadowVisible: false,
          headerTitleStyle: {
            fontFamily: "Bold",
            fontSize: scale(13),
          },
        })}
      />
      <Stack.Screen
        name="PublicCourse"
        component={PublicCourse}
        options={() => ({
          headerTitleAlign: "center",
          headerTitle: "Public Course",
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
