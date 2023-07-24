import axios from "axios";
axios.defaults.withCredentials = true;

//instanciation d'un objet axios
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_ENDPOINT,
    withCredentials: true,
    headers: {
        Accept: 'Content-Type',
        'Content-Type': 'application/json'    
    }
})


export default axiosInstance;