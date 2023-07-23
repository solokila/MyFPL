import { StyleSheet, Text,
     View, Image
 } from 'react-native'
import React from 'react'

//them bottom tab
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomePage from './screens/home';
import Mark from './screens/mark';
import Schedule from './screens/schedule';

const Tab = createBottomTabNavigator();

//tên màn hình
const tabName = {
    HOME: 'Trang chủ',
    SCHEDULE: 'Lịch',
    MARK: 'Điểm',
}

//custom bottom tab
function CustomTabBarIcon(route, focused, color, size) {
    let icon = require('../../media/bottomnavigation_home_selected.png')
    
    switch (route.name) {
        case tabName.HOME:
            if (focused) {
                icon = require('../../media/bottomnavigation_home.png')
                //mau icon khi click

            } else {
                icon = require('../../media/bottomnavigation_home.png')
            }
            break;
        case tabName.SCHEDULE:
            if (focused) {
                icon = require('../../media/img/schedule_icon.png')
            } else {
                icon = require('../../media/img/schedule_icon.png')
            }
            break;
        case tabName.MARK:
            if (focused) {
                icon = require('../../media/img/mark_icon.png')
            } else {
                icon = require('../../media/img/mark_icon.png')
            }
            break;
        default:
            break;
    }
    return <Image source={icon} tintColor={color} style={size} />;
}

const InforNavigation = (props) => {

    const { navigation } = props;

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) =>
                    CustomTabBarIcon(route, focused, color, size),
                tabBarActiveTintColor: '#FED36A',
                tabBarInactiveTintColor: '#617D8A',
                tabBarStyle: {
                    backgroundColor: '#263238',
                    borderTopWidth: 0,
                    height: 60,
                    paddingBottom: 10,
                    paddingTop: 10,
                },
                //them hieu ung highlight
                tabBarLabelStyle: { //
                    fontSize: 12,
                    fontWeight: 'bold',
                    textTransform: 'none',
                    marginTop: 0,
                    marginBottom: 0,
                },
                
            })}
        >
            <Tab.Screen name={tabName.HOME} component={HomePage} />
            <Tab.Screen name={tabName.SCHEDULE} component={Schedule} />
            <Tab.Screen name={tabName.MARK} component={Mark} />
            
        </Tab.Navigator>
    )
}

export default InforNavigation

const styles = StyleSheet.create({})