import { reactive } from 'vue'
import router from "@/router";
import axiosInstance from "@/services/axios";
import axios from 'axios';

export const store = reactive({
    user: null,
    errors: null,
    status: null,
    async getToken() {
        await axios.get(import.meta.env.VITE_API_URL + "/sanctum/csrf-cookie");
    },
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
