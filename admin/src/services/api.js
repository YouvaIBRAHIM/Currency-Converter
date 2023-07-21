import axiosInstance from "@/services/axios";

export const getCurrencies = async (page) => {
    const response = await axiosInstance.get(`/api/currencies?page=${page}`)
    return response.data;
}

export const addCurrency = async (data) => {
    const response = await axiosInstance.post('/api/currencies', data)
    return response.data;
}

export const updateCurrency = async (id, data) => {
    const response = await axiosInstance.put(`/api/currencies/${id}`, data)
    return response.data;
}