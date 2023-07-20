import axiosInstance from "@/services/axios";

export const getCurrencies = async () => {
    const response = await axiosInstance.get('/api/currencies')
    return response.data;
}

export const updateCurrency = async (id, data) => {
    const response = await axiosInstance.put(`/api/currencies/${id}`, data)
    return response.data;
}