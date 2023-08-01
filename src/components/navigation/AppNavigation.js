import 'react-native-gesture-handler';

import React, {useContext} from 'react';

import InforNavigation from '../information/InforNavigation';
import UserNavigation from '../users/UserNavigation';

//them thu vien de su dung stack
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
// context
import {UserContext} from '../users/UserContext';

const Stack = createStackNavigator();

const AppNavigation = () => {
  const {user} = useContext(UserContext);
  return (
    <NavigationContainer>
      {user ? <InforNavigation /> : <UserNavigation />}
    </NavigationContainer>
  );
};

export default AppNavigation;
