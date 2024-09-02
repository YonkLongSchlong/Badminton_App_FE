import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Dashboard from "../Home/Dashboard";
import Profile from "../Home/Profile";

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      screenOptions={{ headerTransparent: true, headerTitle: "" }}
    >
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
