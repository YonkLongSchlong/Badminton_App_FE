import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Dashboard from '../Home/Dashboard';

const Drawer = createDrawerNavigator();


const DrawerNavigation = () => {
  return (
    <Drawer.Navigator screenOptions={{headerTransparent: true, headerTitle: ""}}>
      <Drawer.Screen name='Dashboard' component={Dashboard}/>
    </Drawer.Navigator>
  )
}

export default DrawerNavigation