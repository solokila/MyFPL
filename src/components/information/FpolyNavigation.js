import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Work from './Screens/Work';
import Study from './Screens/Study';
import Tuition from './Screens/Tuition';
const Tab = createMaterialTopTabNavigator();

const FpolyNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#fed36a',
        tabBarInactiveTintColor: '#617d8a',
        tabBarLabelStyle: {
          fontSize: 18,
          fontWeight: 'bold',
          textTransform: 'none',
          marginTop: 50,
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
      <Tab.Screen name="Học Tập" component={Study} />
      <Tab.Screen name="Hoạt Động" component={Work} />
      <Tab.Screen name="Học Phí" component={Tuition} />
    </Tab.Navigator>
  );
};

export default FpolyNavigation;

const styles = StyleSheet.create({});
