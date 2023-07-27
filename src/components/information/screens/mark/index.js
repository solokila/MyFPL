import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MarkPage from './MarkPage';
import History from './History';
import Semester from './Semester';



const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();


const Mark = () => {
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
      <Tab.Screen name="Học kì" component={Semester} />
      <Tab.Screen name="Lịch Sử" component={History} />
      <Tab.Screen name="Bảng điểm" component={MarkPage} />
    </Tab.Navigator>
  );
};

export default Mark;

const styles = StyleSheet.create({});