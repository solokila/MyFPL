import AxiosInstance from "../helpers/AxiosInstance";


//lay danh sach tin tuc
export const getNews = async () => {
    try {
        const response = await AxiosInstance().get('/articles');
        return response.data;
        
    } catch (error) {
        console.log('getNews error:', error);
    }
}

//lay danh sach tin tuc theo id
export const getNewsById = async (id) => {
    try {
        const response = await AxiosInstance().get(`/articles/${id}/detail`);
        // console.log('getNewsById:', response.data)
        return response.data;
        
    } catch (error) {
        console.log('getNewsById error:', error);
    }
}