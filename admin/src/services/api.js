import axiosInstance from "@/services/axios";

export const getCurrencies = async () => {
    const response = await axiosInstance.get('/api/currencies')
    return response.data;
}