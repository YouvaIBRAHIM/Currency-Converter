<script setup>
import { ref, toRef } from 'vue';
import jsonColorizer from "@/services/jsonViewer.js"
import { getRequest } from "@/services/api";

const props = defineProps(['request'])

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
        state.value.response = response
        state.value.status = response
    }finally{
        state.value.isLoading = false;
    }
}
</script>
<template>
    <v-card
        class="mx-auto"
        color="grey-lighten-3"
        max-width="400"
    >
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
            <v-btn color="yellow-darken-1" class="ml-1"  @click="onGetButton">
                GET
            </v-btn>
        </v-card-text>
    </v-card>
    <v-divider></v-divider>

    <div class="status">
        <span v-if="state.status"> Statut : <strong :class="state.status.code === 200 ? 'success' : 'error'">{{ state.status.code }} / {{ state.status.text }}</strong></span>
    </div>
    <div>
        <pre v-html="jsonColorizer.prettyPrint(state.response)"></pre>
    </div>
</template>

<style>
pre {
	background-color: #1a1a1a;
	color: whitesmoke;
	padding: 15px;
    font-size: 12px;
	box-shadow: 0 0 10px black;
    height: 75vh;
    overflow: auto;
}
pre span.json-key {
	color: #a0dbfc!important;
}
pre .json-number {
	color: #b6ceaa!important;
}
pre .json-string {
	color: #cc927b!important;
}
pre .json-boolean {
	color: #5b9bd2!important;
}

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