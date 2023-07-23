<script setup>
import { ref, toRef } from 'vue';
import jsonColorizer from "@/services/jsonViewer.js"
import { getRequest } from "@/services/api";
import JsonViewer from '@/components/public/JsonViewer.vue';
const props = defineProps(['request', 'oncloseDrawer'])

const request = toRef(props.request);

const state = ref({ isLoading: false, response: {message: "Bienvenue sur l'API MoneyValue"}, status: null });

const onGetButton = async () => {
    state.value.isLoading = true;
    try {
        const response = await getRequest(request.value.endpoint)
        state.value.status = {
            code: response.status,
            text: response.statusText
        }
        state.value.response = response.data
    } catch (error) {
        
        const response = {
            code: error.response?.status ?? "404",
            text: error.response?.statusText ?? "Not Found"
        }

        if (error.response?.data?.message) {
            response["message"] =  error.response.data.message
        }
        state.value.response = response
        state.value.status = response
    }finally{
        state.value.isLoading = false;
    }
}
</script>
<template>

    <v-btn color="grey-lighten-2" class="ma-1"  @click="props.oncloseDrawer">
        <v-icon icon="mdi-window-close" title="Fermer"></v-icon>
    </v-btn>
    <v-card-text class="d-flex align-center justify-space-around">
        <v-text-field
            v-model="request.endpoint"
            :loading="state.isLoading"
            density="compact"
            variant="solo"
            label="Entrez une URL"
            single-line
            hide-details
            class="mr-1"
        ></v-text-field>
        <v-btn color="blue-darken-1" class="ml-1"  @click="onGetButton">
            GET
        </v-btn>
    </v-card-text>
    <v-divider></v-divider>

    <div class="status">
        <span v-if="state.status"> Statut : <strong :class="state.status.code === 200 ? 'success' : 'error'">{{ state.status.code }} / {{ state.status.text }}</strong></span>
    </div>

    <json-viewer :json="state.response" />

</template>

<style>

.status{
    height: 30px;
    padding-left: 1rem;
    display: flex;
    align-items: center;
}

.status .success{
    color: #6ac510;
}

.status .error{
    color: rgb(217, 22, 22);
}

</style>