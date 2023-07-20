import { ref } from "vue";
import { getCurrencies } from "@/services/api";

export const useCurrencies = () => {
    const currencies = ref(null)
    const isLoading = ref(false)
    const error = ref(null)
    
    const fetchData = async () => {
        isLoading.value = true;
        try {
            const response = await getCurrencies();
            currencies.value = response;
        } catch (err) {
            error.value = err.message;
        } finally {
            // isLoading.value = false;
        }
    }

    fetchData();

    return { currencies, isLoading, error }
}