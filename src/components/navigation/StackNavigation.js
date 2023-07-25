import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../user/Screens/Login';
import FpolyNavigation from '../Fpoly/FpolyNavigation';
import WorkStack from '../Fpoly/Screens/WorkStack';
import StudyStack from '../Fpoly/Screens/StudyStack';
import TuitionStack from '../Fpoly/Screens/TuitionStack';

const StackNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      inittual="FpolyNavigation"
      screenOptions={{
        headerTintColor: '#fed36a',
        headerStyle: {
          backgroundColor: '#263238',
        },
      }}>
      <Stack.Screen
        name="avigation"
        component={FpolyNavigation}
        options={{headerShown: false}}
      />
      <Stack.Screen name="WorkStack" component={WorkStack} />
      <Stack.Screen name="StudyStack" component={StudyStack} />
      <Stack.Screen name="TuitionStack" component={TuitionStack} />
    </Stack.Navigator>
  );
};

export default StackNavigation;

const styles = StyleSheet.create({});
