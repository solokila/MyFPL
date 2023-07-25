import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Tuition from './Tuition';
import Study from './Study';
import Work from './Work';
const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

const Schedule = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#fed36a',
        tabBarInactiveTintColor: '#617d8a',
        tabBarLabelStyle: {
          fontSize: 18,
          fontWeight: 'bold',
          textTransform: 'none',
          marginTop: 0,
          marginBottom: 0,
        },
        tabBarIndicatorStyle: {
          backgroundColor: '#fed36a',
          height: '5%',
          width: '20%',
          marginLeft: '5.2%',
        },
        tabBarStyle: {
          backgroundColor: '#263238',
          elevation: 10,
        },
      }}>
      <Tab.Screen name="Học tập" component={Study} />
      <Tab.Screen name="Hoạt động" component={Work} />
      <Tab.Screen name="Học phí" component={Tuition} />
    </Tab.Navigator>
  );
};

export default Schedule;

const styles = StyleSheet.create({});
