import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ScheduleScreen from './ScheduleScreen ';
import ExamScheduleScreen from './ExamScheduleScreen ';
import AttendanceNavigation from './AttendanceNavigation';

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
      <Tab.Screen name="Lịch học" component={ScheduleScreen} />
      <Tab.Screen name="Lịch thi" component={ExamScheduleScreen} />
      <Tab.Screen name="Điểm danh" component={AttendanceNavigation} />
    </Tab.Navigator>
  );
};

export default Schedule;

const styles = StyleSheet.create({});