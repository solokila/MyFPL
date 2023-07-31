import React, { useState, useContext, createContext } from 'react'
import { register, login } from './UserService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext();

export const UserProvider = (props) => {
    const { children } = props;
    const [user, setUser] = useState(null);

    const onRegister = async (username, password, classname) => {
        try {
            const response = await register(username, password, classname);
            // console.log('onRegister response:', response);
            return true;
        } catch (error) {
            console.log('onRegister error:', error);
        }
        return false;
    }

    const onLogin = async (username, password) => {
        try {
            // console.log('onLogin username:', username);
            const response = await login(username, password);
            console.log('onLogin response:', response);
            if (response.status === 200) {
                // await AsyncStorage.setItem('token', response?.data?.token);
                setUser(response?.data);
                // console.log('onLogin user:', user);
                return true;
            }
        } catch (error) {
            console.log('onLogin error:', error);
        }
        return false;
    }

    return (
        <UserContext.Provider
            value={{
                user, setUser, onRegister, onLogin
            }}>
            {children}
        </UserContext.Provider>
    )
}
