<script setup>
import { ref } from 'vue';
import ApiTester from "@/components/public/ApiTester.vue";
import EndpointDetails from '@/components/public/EndpointDetails.vue';
import { api } from "@/composables/api";
import { useTitle } from "@vueuse/core";

useTitle("Documentation - Money Value");

const drawer = ref(false);

const request = ref({
  endpoint: "/"
});

//affiche le composant permettant de faire des requetes en methode GET
const onOpenDrawer = (endpoint) => {
  request.value.endpoint = endpoint;
  drawer.value = true;
}

//fait disparaitre le composant permettant de faire des requetes en methode GET
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
              src="/img/logo.svg"
              cover
            >
              <v-card-title :style="{ color: '#000000' }">Votre partenaire de conversion monétaire</v-card-title>
            </v-img>

            <v-card-subtitle class="pt-4">
              Dernière mise à jour : 24/07/2023
            </v-card-subtitle>

            <v-card-title tag="h3" :style="{ color: '#000000' }">Présentation de MoneyValue</v-card-title>

            <v-card-text class="mb-4">
              <div>
                Bienvenue dans la documentation de MoneyValue, une plateforme de conversion monétaire développée dans le domaine de la finance. MoneyValue offre un service public et gratuit qui permet d'acquérir des données sur les conversions de devises les plus demandées.
              </div>
            </v-card-text>

            <v-card-title tag="h3" :style="{ color: '#000000' }">L'API REST de MoneyValue</v-card-title>

            <v-card-text class="mb-4">
              <div>
                Notre API REST est spécialement conçue pour permettre aux développeurs tiers d'accéder facilement et efficacement à nos services de conversion de devises. Elle offre une solution robuste et flexible pour convertir des devises en d'autres devises en utilisant un endpoint simple.
              </div>
            </v-card-text>

            <v-card-title tag="h3" :style="{ color: '#000000' }">Accès à l'API</v-card-title>

            <v-card-text class="mb-4">
              L'endpoint de l'API est : 
              <v-code>
                localhost:8000/api
              </v-code>
            </v-card-text>

            <v-card-title tag="h3" :style="{ color: '#000000' }">Fonctionnalités de l'API</v-card-title>

            <v-list lines="one">
              <v-list-item
              >
              <strong>Vérification du service</strong> : Les développeurs externes peuvent effectuer une requête pour vérifier si notre service est fonctionnel avant de commencer la conversion des devises.
              </v-list-item>
              <v-list-item
              >
              <strong>Liste des devises</strong> : L'API fournit une liste des devise de conversion supportées, ce qui permet aux développeurs d'obtenir toutes les informations nécessaires.
              </v-list-item>
              <v-list-item
              >
              <strong>Liste des paires de conversion</strong> :  L'API fournit une liste des paires de conversion supportées, ce qui permet aux développeurs d'obtenir toutes les informations nécessaires pour effectuer des conversions spécifiques.
              </v-list-item>
              <v-list-item
              >
              <strong>Conversion de devises</strong> : Les développeurs peuvent utiliser l'API pour effectuer des conversions de devises en fournissant la quantité de devise à convertir et en spécifiant la paire de conversion souhaitée.
              </v-list-item>
            </v-list>

            <v-card-title tag="h3" :style="{ color: '#000000' }">Format des données</v-card-title>

            <v-card-text class="mb-4">
              Les données de conversion sont retournées au format JSON, ce qui permet une intégration fluide avec différents systèmes.
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