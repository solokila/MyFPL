import React, { useContext } from 'react'
import {
  StyleSheet, Text, View, Image, TouchableOpacity
} from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

import Home from './screens/Home';
import Explore from './screens/Explore';
import Bookmark from './screens/Bookmark';
import Detail from './screens/Detail';
import HomeStack from './screens/HomeStack';
import Profile from '../users/screens/Profile';

function CustomTabBarIcon(route, focused, color, size) {
  let icon = require('../../media/bottomnavigation_home_selected.png')
  switch (route.name) {
    case 'HomeStack':
      if (focused) {
        icon = require('../../media/bottomnavigation_home_selected.png')
      } else {
        icon = require('../../media/bottomnavigation_home.png')
      }
      break;
    case 'Explore':
      if (focused) {
        icon = require('../../media/bottomnavigation_compass_selected.png')
      } else {
        icon = require('../../media/bottomnavigation_compass.png')
      }
      break;
    case 'Bookmark':
      if (focused) {
        icon = require('../../media/bottomnavigation_bookmark_selected.png')
      } else {
        icon = require('../../media/bottomnavigation_bookmark.png')
      }
      break;
    case 'Profile':
      if (focused) {
        icon = require('../../media/bottomnavigation_profile_selected.png')
      } else {
        icon = require('../../media/bottomnavigation_profile.png')
      }
      break;
    default:
      break;
  }
  return <Image source={icon} tintColor={color} style={size} />;
}

const NewsNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) =>
          CustomTabBarIcon(route, focused, color, size),
      })}
    >
      <Tab.Screen name='HomeStack' component={HomeStack} />
      <Tab.Screen name='Explore' component={Explore} />
      <Tab.Screen name='Bookmark' component={Bookmark} />
      <Tab.Screen name='Profile' component={Profile} />
    </Tab.Navigator>
  )
}

export default NewsNavigation