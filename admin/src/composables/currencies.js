import { ref } from "vue";
import { getCurrencies } from "@/services/api";

export const useCurrencies = (currencies, state, page) => {

    const fetchData = async () => {
        state.value.isLoading = true;
        try {
            const response = await getCurrencies(page);
            currencies.value = response;
        } catch (err) {
            state.value.snackbar = true
            state.value.error = err?.response?.data ? err?.response?.data[0] : err.message;
        } finally {
            state.value.isLoading = false;
        }
    }

    fetchData();

}
