import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const HomePage = () => {
  return (
    <View style={{
      backgroundColor:"#212832",
      flex:1,
    }}>
      <Text
      style={{
        color:"#fff",
        fontSize:20,
        fontWeight:"bold",
        textAlign:"center",
        marginTop:20
      }}
      >HomePage</Text>
    </View>
  )
}

export default HomePage

const styles = StyleSheet.create({})