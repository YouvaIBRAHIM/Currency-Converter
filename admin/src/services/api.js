import axiosInstance from "@/services/axios";

//Devises

export const getCurrencies = async (page) => {
    const url = page ? `/currencies?page=${page}` : `/currencies/all`;
    const response = await axiosInstance.get(url)
    return response.data;
}

export const getCurrenciesWithPairs = async (page) => {
    const url = `/currencies/pairs?page=${page}`;
    const response = await axiosInstance.get(url)
    return response.data;
}


export const addCurrency = async (data) => {
    const response = await axiosInstance.post('/currencies', data)
    return response.data;
}

export const updateCurrency = async (id, data) => {
    const response = await axiosInstance.put(`/currencies/${id}`, data)
    return response.data;
}

export const deleteCurrency = async (id) => {
    const response = await axiosInstance.delete(`/currencies/${id}`)
    return response.data;
}

// Paires

export const getPairs = async (page) => {
    const response = await axiosInstance.get(`/pairs?page=${page}`)
    return response.data;
}

export const addPair = async (data) => {
    const response = await axiosInstance.post('/pairs', data)
    return response.data;
}

export const updatePair = async (id, data) => {
    const response = await axiosInstance.put(`/pairs/${id}`, data)
    return response.data;
}

export const deletePair = async (id) => {
    const response = await axiosInstance.delete(`/pairs/${id}`)
    return response.data;
}

//global
export const getRequest = async (url) => {
    const response = await axiosInstance.get(url)
    return response;
}

//api config
export const getApiConfig = async () => {
    const response = await axiosInstance.get(`/apiConfig`)
    return response.data;
}

export const setApiConfig = async (data) => {
    const response = await axiosInstance.put(`/apiConfig`, data)
    return response.data;
}