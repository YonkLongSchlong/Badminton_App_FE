import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import DrawerNavigation from './DrawerNavigation'

const Stack = createNativeStackNavigator()

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name='DrawerNavigation' component={DrawerNavigation}/>
    </Stack.Navigator>
  )
}

export default AppStack

const styles = StyleSheet.create({})