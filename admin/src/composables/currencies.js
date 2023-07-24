import { getCurrencies, getCurrenciesWithPairs } from "@/services/api";

/**
 * Récupére les devises
 * @param {Object} currencies contiendra les devises
 * @param {Object} state contiendra l'état de la récupération des devises
 * @param {Number} page numéro de la page à récupérer
 */
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

/**
 * Récupére les devises avec les paires associées
 * @param {Object} currencies contiendra les devises avec les paires associées
 * @param {Object} state contiendra l'état de la récupération des devises
 * @param {Number} page numéro de la page à récupérer
 */
export const useCurrenciesWithPairs = (currencies, state, page) => {

    const fetchData = async () => {
        state.value.isLoading = true;
        try {
            const response = await getCurrenciesWithPairs(page);
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
