import { getPairs } from "@/services/api";


/**
 * Récupére les paires
 * @param {Object} currencies contiendra les paires
 * @param {Object} state contiendra l'état de la récupération des paires
 * @param {Number} page numéro de la page à récupérer
 */
export const usePairs = (pairs, state, page) => {

    const fetchData = async () => {
        state.value.isLoading = true;
        try {
            const response = await getPairs(page);
            pairs.value = response;
        } catch (err) {
            state.value.snackbar = true
            state.value.error = err?.response?.data ? err?.response?.data[0] : err.message;
        } finally {
            state.value.isLoading = false;
        }
    }

    fetchData();

}
