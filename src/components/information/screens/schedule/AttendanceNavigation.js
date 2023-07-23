import { View, Text } from 'react-native'
import React from 'react'
//tao stack
import { createStackNavigator } from '@react-navigation/stack';
import AttendanceInfoScreen from './/AttendanceInfoScreen';
import AttendanceScreen from './/AttendanceScreen ';

const Stack = createStackNavigator();

const AttendanceNavigation = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName='AttendanceScreen'
        >
            <Stack.Screen name="AttendanceScreen" component={AttendanceScreen} />
            <Stack.Screen name="AttendanceInfoScreen" component={AttendanceInfoScreen} />
        </Stack.Navigator>
    )
}

export default AttendanceNavigation