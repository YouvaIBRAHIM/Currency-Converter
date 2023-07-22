import axiosInstance from "@/services/axios";

//Devises

export const getCurrencies = async (page) => {
    const url = page ? `/api/currencies?page=${page}` : `/api/currencies/all`;
    const response = await axiosInstance.get(url)
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

export const deleteCurrency = async (id) => {
    const response = await axiosInstance.delete(`/api/currencies/${id}`)
    return response.data;
}

// Paires

export const getPairs = async (page) => {
    const response = await axiosInstance.get(`/api/pairs?page=${page}`)
    return response.data;
}

export const addPair = async (data) => {
    const response = await axiosInstance.post('/api/pairs', data)
    return response.data;
}

export const updatePair = async (id, data) => {
    const response = await axiosInstance.put(`/api/pairs/${id}`, data)
    return response.data;
}

export const deletePair = async (id) => {
    const response = await axiosInstance.delete(`/api/pairs/${id}`)
    return response.data;
}

//global
export const getRequest = async (url) => {
    const response = await axiosInstance.get(url)
    return response.data;
}