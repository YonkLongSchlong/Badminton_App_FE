import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Auth/Login';
import Register from "../Auth/Register"
import VerifyOTP from "../Auth/VerifyOTP"
import ForgotPassword from "../Auth/ForgotPassword"
import GettingStarted from "../Auth/GettingStarted"
import ResetPassword from '../Auth/ResetPassword';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name='GettingStarted' component={GettingStarted}/>
      <Stack.Screen name='Login' component={Login}/>
      <Stack.Screen name='Register' component={Register}/>
      <Stack.Screen name='ForgotPassword' component={ForgotPassword}/>
      <Stack.Screen name='VerifyOTP' component={VerifyOTP}/>
      <Stack.Screen name='ResetPassword' component={ResetPassword}/>
    </Stack.Navigator>
  )
}

export default AuthStack