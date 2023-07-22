<script setup>
import { computed, ref } from 'vue';
import jsonColorizer from "@/services/jsonViewer.js"
import { getRequest } from "@/services/api";



const state = ref({ isLoading: false, request: "api/currencies", response: null });

const onGetButton = async () => {
    state.value.isLoading = true;

    try {
        const response = await getRequest(state.value.request)
        state.value.response = response
    } catch (error) {
        state.response = error
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
                v-model="state.request"
                :loading="state.isLoading"
                density="compact"
                variant="solo"
                label="Entrez une URL"
                single-line
                hide-details
            ></v-text-field>
            <v-btn color="yellow-darken-1"   @click="onGetButton">
                GET
                <v-tooltip
                    activator="parent"
                    location="top"
                >Annuler</v-tooltip>
            </v-btn>
        </v-card-text>
    </v-card>
    <v-divider></v-divider>
    <div>
        <pre v-html="jsonColorizer.prettyPrint(state.response)"></pre>

    </div>
</template>

<style>
pre {
	background-color: #1a1a1a;
	color: whitesmoke;
	padding: 15px;
	font-size: 18px;
	box-shadow: 0 0 10px black;
    height: 80vh;
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

pre span{
    font-size: 10px;
}

</style>