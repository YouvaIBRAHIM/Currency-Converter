import { reactive } from 'vue'
import router from "@/router";
import axiosInstance from "@/services/axios";
import axios from 'axios';

//state globale contenant les informations et les methodes relatives à l'authentification
export const store = reactive({
    user: null,
    errors: null,
    status: null,
    //génére un token permetant d'ouvrir une nouvelle session avec le serveur
    async getToken() {
        await axios.get(import.meta.env.VITE_API_URL + "/sanctum/csrf-cookie");
    },
    //récupére l'utilisateur connecté
    async getUser() {
        await this.getToken();
        try {
            const data = await axiosInstance.get("/user");
            if (data) {
                this.user = data.data
                return true
            }
        } catch (error) {
            return false;
        }
    },
    /**
     * Exécute une requete permettant de s'authentifier
     * @param {Obect} data contient les informations saisis par l'utilisateur
     */
    async handleLogin(data) {
        this.errors = null;
        await this.getToken();

        try {
            const response = await axios.post(import.meta.env.VITE_API_URL + "/login", {
                email: data.email,
                password: data.password,
            });
            if (response?.status === 202) {
                router.push("/admin")
            }
        } catch (error) {
            this.errors = error.response.status == 422 ? "Les identifiants sont incorrects" : error.response.data.message;
        }
    },
    //Exécute une requete permettant de se déconnecter
    async handleLogout() {
        try {
            const response = await axios.post(import.meta.env.VITE_API_URL + "/logout");
            if (response) {
                this.user = null;
                router.push("/login")
            }
        } catch (error) {
            this.errors = error.response.data.message
        }
    },
});
