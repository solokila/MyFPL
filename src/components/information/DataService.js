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

// get schedule by id of student
export const getScheduleById = async(id) =>{
    const response = await AxiosInstance().get(`/schedule/id?id=${id}`);
    return response;
}

// get exam schedule by id of student
export const getExamScheduleById = async(id) =>{
    const response = await AxiosInstance().get(`/exam/id?id=${id}`);
    return response;
}

// get attendance by id of student
export const getAttendanceById = async(id) =>{
    const response = await AxiosInstance().get(`/attendance/id?id=${id}`);
    return response;
}


