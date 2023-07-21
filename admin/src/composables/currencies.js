import { ref } from "vue";
import { getCurrencies } from "@/services/api";

export const useCurrencies = (currencies, isLoading, error, page) => {

    const fetchData = async () => {
        isLoading.value = true;
        try {
            const response = await getCurrencies(page);
            currencies.value = response;
        } catch (err) {
            error.value = err?.response?.data ? err?.response?.data[0] : err.message;
        } finally {
            isLoading.value = false;
        }
    }

    fetchData();

}
