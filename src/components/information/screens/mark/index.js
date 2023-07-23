import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Mark = (props) => {
  const { navigation } = props;
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
      >Mark 1234</Text>
    </View>
  )
}

export default Mark

const styles = StyleSheet.create({})