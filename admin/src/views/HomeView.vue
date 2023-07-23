<script setup>
import { ref } from 'vue';
import ApiTester from "@/components/public/ApiTester.vue";
import EndpointDetails from '@/components/public/EndpointDetails.vue';
import { api } from "@/composables/api";

const drawer = ref(false);

const request = ref({
  endpoint: "/"
});

const onOpenDrawer = (endpoint) => {
  request.value.endpoint = endpoint;
  drawer.value = true;
}

const oncloseDrawer = () => {
  drawer.value = false;
}

</script>

<template>
        <v-layout>
          <v-navigation-drawer
            v-model="drawer"
            location="right"
            class="drawer"
            color="#f5f1ed"
          >
            <ApiTester :request="request" :oncloseDrawer="oncloseDrawer"/>
          </v-navigation-drawer>
          <v-main class="main">

            <v-img
              class="align-end text-white"
              height="200"
              src="/img/money_value_logo.svg"
              cover
            >
              <v-card-title :style="{ color: '#000000' }">Votre partenaire de conversion monétaire</v-card-title>
            </v-img>

            <v-card-subtitle class="pt-4">
              Dernière mise à jour : 24/07/2023
            </v-card-subtitle>

            <v-card-text>
              <div>Whitehaven Beach</div>
            </v-card-text>

            <template v-for="(endpoint, key) in api" :key="key">
              <EndpointDetails :endpoint="key" :description="endpoint"  :onOpenDrawer="() => onOpenDrawer(endpoint.endpoint)"/>    
            </template>

          </v-main>
        </v-layout>

</template>

<style>
.main,
.drawer{
  min-height: 100vh;
}

.drawer{
  min-width: 550px;
  position: fixed !important;
}

@media (max-width: 600px) {

  .drawer{
    min-width: 350px;
  }
}
</style>