import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import Lottie from 'lottie-react-native';

const AppLoader = () => {
  const link = data[2].link;
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

const data = [
  {
    "link": "https://assets3.lottiefiles.com/private_files/lf30_l8csvun7.json",
  },
  {
    "link": "https://lottie.host/0e1010fa-5efb-48a4-9037-4517110e01ee/sWOKGgthOI.json",
  },
  {
    "link": "https://lottie.host/957711c8-2d7c-44b2-928a-69247ce22270/O9aAYhAbcx.json",
  },
]
