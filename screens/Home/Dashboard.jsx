import {  Text, View } from 'react-native'
import React from 'react'
import { ScaledSheet } from 'react-native-size-matters'

const Dashboard = () => {
  return (
    <View style={styles.container}>

      {/* IMAGE CONTAINER */}
      <View style={styles.imageContainer}>

      </View>

      <View>

      </View>
    </View>
  )
}

export default Dashboard

const styles = ScaledSheet.create({
  container: {
    flex:1,
    backgroundColor: "white"
  }
})