import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import Lottie from 'lottie-react-native';

const AppLoader = () => {
  const link = 'https://assets3.lottiefiles.com/private_files/lf30_l8csvun7.json';
  return (
    <View style = {styles.body}>
        <Lottie
        // source={require("../media/gifs/loader.json")} 
        source={{uri:link}} 
        autoPlay loop />
    </View>
  )
}

export default AppLoader

const styles = StyleSheet.create({
    body:{
        position:'absolute',
        width:'100%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
        zIndex:1,
    }
})