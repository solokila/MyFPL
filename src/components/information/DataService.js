import AxiosInstance from "../helpers/AxiosInstance";

// get all notifications
export const getAllNotifications = async() =>{
    const response = await AxiosInstance().get('/notification');
    return response;
}

// get all transcripts
export const getAllTranscripts = async() =>{
    const response = await AxiosInstance().get('/transcript');
    return response;
}

// get all subjects
export const getAllSubjects = async() =>{
    const response = await AxiosInstance().get('/subject');
    return response;
}

