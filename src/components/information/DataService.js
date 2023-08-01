import AxiosInstance from "../helpers/AxiosInstance";

// get all notifications
export const getAllNotifications = async() =>{
    const response = await AxiosInstance().get('/notification');
    return response;
}   

