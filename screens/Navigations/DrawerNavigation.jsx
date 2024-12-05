import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Dashboard from "../Home/Dashboard";
import Profile from "../Home/Profile";
import SportDashboard from "../Sport/SportDashboard";
import AllCourses from "../Home/AllCourses";

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      screenOptions={{ headerTransparent: true, headerTitle: "" }}
    >
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen name="All Courses" component={AllCourses} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="SportDashboard" component={SportDashboard} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
