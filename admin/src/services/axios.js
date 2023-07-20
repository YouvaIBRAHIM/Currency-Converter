import axios from "axios";
axios.defaults.withCredentials = true;

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    headers: {
        Accept: 'Content-Type',
        'Content-Type': 'application/json'    
    }
})


export default axiosInstance;