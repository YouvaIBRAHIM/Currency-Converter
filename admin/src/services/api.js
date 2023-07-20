import axiosInstance from "@/services/axios";

export const getUsers = async () => {
    const response = await axiosInstance.get('/api/currencies')
    return response.data;
}