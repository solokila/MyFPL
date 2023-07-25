import 'react-native-gesture-handler';

import React, {useContext} from 'react';

import InforNavigation from '../information/InforNavigation';
import Login from '../users/screens/Login';
import WorkStack from '../information/screens/home/WorkStack';
import StudyStack from '../information/screens/home/StudyStack';
import TuitionStack from '../information/screens/home/TuitionStack';

//them thu vien de su dung stack
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="InforNavigation" component={InforNavigation} />
        <Stack.Screen name="WorkStack" component={WorkStack} />
        <Stack.Screen name="StudyStack" component={StudyStack} />
        <Stack.Screen name="TuitionStack" component={TuitionStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
