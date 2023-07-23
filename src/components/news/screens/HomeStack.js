import { 
    StyleSheet, Text, View 
} from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './Home';
import Detail from './Detail';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
        InitialRouteName='Home' //mac dinh
        screenOptions={{
            headerShown: false
        }}
    >
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Detail' component={Detail} />
    </Stack.Navigator>
  )
}

export default HomeStack

const styles = StyleSheet.create({})