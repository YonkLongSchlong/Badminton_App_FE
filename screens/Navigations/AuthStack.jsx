import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Auth/Login';
import Register from "../Auth/Register"
import GettingStarted from "../Auth/GettingStarted"

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name='GettingStarted' component={GettingStarted}/>
      <Stack.Screen name='Login' component={Login}/>
      <Stack.Screen name='Register' component={Register}/>
    </Stack.Navigator>
  )
}

export default AuthStack