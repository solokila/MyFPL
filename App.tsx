import React from 'react';
import type { PropsWithChildren } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import Login from './src/components/users/screens/Login';
import InforNavigation from './src/components/information/InforNavigation';
import AppNavigation from './src/components/navigation/AppNavigation';
import { UserProvider } from './src/components/users/UserContext';

import Register from './src/components/users/screens/Register';
import UserNavigation from './src/components/users/UserNavigation';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function App(): JSX.Element {
  return (
    <SafeAreaView style={styles.body}>
      <UserProvider>
        <AppNavigation />
      </UserProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#212832',
    width: '100%',
    height: '100%',
  },
});

export default App;
