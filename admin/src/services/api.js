import axiosInstance from "@/services/axios";

//Devises

/**
 * Exécute la requete qui récupére les devises avec une pagination
 * @param {Number} page Numéro de la page à récupérer
 * @returns la réponse de la requete
 */
export const getCurrencies = async (page) => {
    const url = page ? `/currencies?page=${page}` : `/currencies/all`;
    const response = await axiosInstance.get(url)
    return response.data;
}

/**
 * Exécute la requete qui récupére les devises avec les paires associées
 * @param {Number} page Numéro de la page à récupérer
 * @returns la réponse de la requete
 */
export const getCurrenciesWithPairs = async (page) => {
    const url = `/currencies/pairs?page=${page}`;
    const response = await axiosInstance.get(url)
    return response.data;
}

/**
 * Exécute la requete qui ajoute une nouvelle devise
 * @param {Object} data Contient les informations de la nouvelle devise
 * @returns la réponse de la requete
 */
export const addCurrency = async (data) => {
    const response = await axiosInstance.post('/currencies', data)
    return response.data;
}

/**
 * Exécute la requete qui modifie une devise
 * @param {Number} id Contient l'id de la devise à modifier
 * @param {Object} data Contient les informations de la devise à modifier
 * @returns la réponse de la requete
 */
export const updateCurrency = async (id, data) => {
    const response = await axiosInstance.put(`/currencies/${id}`, data)
    return response.data;
}

/**
 * Exécute la requete qui supprime une devise
 * @param {Number} id Contient l'id de la devise à supprimer
 * @returns la réponse de la requete
 */
export const deleteCurrency = async (id) => {
    const response = await axiosInstance.delete(`/currencies/${id}`)
    return response.data;
}

// Paires

/**
 * Exécute la requete qui récupére les paires avec une pagination
 * @param {Number} page Numéro de la page à récupérer
 * @returns la réponse de la requete
 */
export const getPairs = async (page) => {
    const response = await axiosInstance.get(`/pairs?page=${page}`)
    return response.data;
}

/**
 * Exécute la requete qui ajoute une nouvelle paire
 * @param {Object} data Contient les informations de la nouvelle paire
 * @returns la réponse de la requete
 */
export const addPair = async (data) => {
    const response = await axiosInstance.post('/pairs', data)
    return response.data;
}

/**
 * Exécute la requete qui modifie une paire
 * @param {Number} id Contient l'id de la paire à modifier
 * @param {Object} data Contient les informations de la paire à modifier
 * @returns la réponse de la requete
 */
export const updatePair = async (id, data) => {
    const response = await axiosInstance.put(`/pairs/${id}`, data)
    return response.data;
}

/**
 * Exécute la requete qui supprime une paire
 * @param {Number} id Contient l'id de la paire à supprimer
 * @returns la réponse de la requete
 */
export const deletePair = async (id) => {
    const response = await axiosInstance.delete(`/pairs/${id}`)
    return response.data;
}

//global
/**
 * Exécute une requete en methode GET avec n'importe quel endpoint
 * @param {string} url endpoint à exécuter
 * @returns la réponse de la requete
 */
export const getRequest = async (url) => {
    const response = await axiosInstance.get(url)
    return response;
}

//api config

/**
 * Exécute une requete qui récupére la configuration de l'api
 * @returns la réponse de la requete
 */
export const getApiConfig = async () => {
    const response = await axiosInstance.get(`/apiConfig`)
    return response.data;
}

/**
 * Exécute la requete qui modifie la configuration de l'api
 * @param {Object} data Contient les informations de la configuration de l'api
 * @returns la réponse de la requete
 */
export const setApiConfig = async (data) => {
    const response = await axiosInstance.put(`/apiConfig`, data)
    return response.data;
}