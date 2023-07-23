import React, { useState, useContext, createContext } from 'react'
import { register, login } from './UserService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext();

export const UserProvider = (props) => {
    const { children } = props;
    const [user, setUser] = useState(null);

    const onRegister = async (email, password) => {
        try {
            const response = await register(email, password);
            // console.log('onRegister response:', response);
            return true;
        } catch (error) {
            console.log('onRegister error:', error);
        }
        return false;
    }

    const onLogin = async (email, password) => {
        try {
            const response = await login(email, password);
            // console.log('onLogin response:', response);
            if (response.statusCode === 200) {
                await AsyncStorage.setItem('token', response?.data?.token);
                setUser(response?.data?.user);
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
