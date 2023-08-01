import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './MainStack';
import Detail from './DetailStack';
const Stack = createStackNavigator();

const HomePage = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name='Main' component={Main} />
      <Stack.Screen name='Detail' component={Detail} />
    </Stack.Navigator>
  );

};

export default HomePage;

const styles = StyleSheet.create({});
