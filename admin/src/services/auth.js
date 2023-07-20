import { reactive } from 'vue'
import router from "@/router";
import axiosInstance from "@/services/axios";

export const store = reactive({
    user: null,
    errors: [],
    status: null,
    async getToken() {
        await axiosInstance.get("/sanctum/csrf-cookie");
    },
    async getUser() {
        await this.getToken();
        try {
            const data = await axiosInstance.get("/api/user");
            if (data) {
                this.user = data.data
                return true
            }
        } catch (error) {
            return false;
        }
    },
    async handleLogin(data) {
        this.errors = [];
        await this.getToken();

        try {
            const response = await axiosInstance.post("/login", {
                email: data.email,
                password: data.password,
            });
            if (response?.status === 202) {
                router.push("/admin")
            }
        } catch (error) {
            console.log("🚀 ~ file: auth.js:37 ~ handleLogin ~ error:", error)
        }
    },
    async handleLogout() {
        try {
            const response = await axiosInstance.post("/logout");
            if (response) {
                this.user = null;
                router.push("/login")
            }
        } catch (error) {
            console.log("🚀 ~ file: auth.js:49 ~ handleLogout ~ error:", error)
        }
    },
});
