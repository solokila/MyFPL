
import AxiosInstance from "../helpers/AxiosInstance";

export const register = async(email,password) =>{
    const body = {email,password};
    const response = await AxiosInstance().post('/users/register',body);
    return response;
}

export const login = async(email,password) =>{
    const body = {email,password};
    const response = await AxiosInstance().post('/auth/login',body);
    return response;
}