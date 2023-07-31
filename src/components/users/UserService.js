
import AxiosInstance from "../helpers/AxiosInstance";

export const register = async(userName,passWord,className) =>{
    const body = {userName,passWord,className};
    const response = await AxiosInstance().post('/users/register',body);
    return response;
}

export const login = async(userName,passWord) =>{
    const body = {userName,passWord};
    // console.log('login body:',body);
    const response = await AxiosInstance().post('/users/login',body);
    return response;
}