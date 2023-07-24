<script setup>
import { useCurrenciesWithPairs } from "@/composables/currencies";
import router from "@/router";
import { ref, watch } from "vue";
import TableSkeletonLoader from "@/components/TableSkeletonLoader.vue";
import { store } from "@/services/auth.js";
import CurrencyPairsLine from "@/components/admin/CurrencyPairsLine.vue"
import { useTitle } from "@vueuse/core";

useTitle("Accueil - Money Value");

const page = ref(router?.currentRoute?.value?.query?.page ?? 1)
const currencies = ref(null);
const state = ref({success : null, isLoading : false, error : null, snackbar: false});

useCurrenciesWithPairs(currencies, state, page.value);

watch(page, async (newValue) => {
  useCurrenciesWithPairs(currencies, state, newValue);
})

const onPageChange = (pageNumber) => {
  router.push(`/admin?page=${pageNumber}`)
  page.value = pageNumber
}

</script>

<template>
  <v-container>
    <h3 class="font-weight-light">
      Bienvenue {{ store.user.name }}
    </h3>

    <v-banner
      lines="two"
      icon="mdi-information"
      color="deep-purple-accent-4"
      class="my-4"
    >
      <span>
        Vous trouverez sur cette page la liste des pairs de chaque devise avec leur taux de change et nombre d'appels API.<br>
        Cette page a pour but de simplifier la lecture des données. Si vous souhaitez modifier les pairs veuillez cliquer sur ce 
        <v-btn variant="outlined" color="blue-darken-1" class="m-1" @click="router.push({name: 'Pairs', path: '/admin/pairs'})">bouton</v-btn>
      </span>

    </v-banner>
    <v-table
      fixed-header
      height="70vh"
    >
      <thead>
        <tr>
          <th class="text-left">
            Devises
          </th>
          <th class="text-left">
            Paires
          </th>
          <th class="text-left">
            Taux de change
          </th>
          <th class="text-left">
            Appels API
          </th>
        </tr>
      </thead>
      
      <tbody>
        <template v-if="state.isLoading">
          <tr v-for="n in 5" :key="n">
            <TableSkeletonLoader cell="4"/>
          </tr>
        </template>
        <template v-else-if="currencies?.data" v-for="currency in currencies?.data" :key="currency.id">
          <CurrencyPairsLine  :currency="currency"/>
        </template>
      </tbody>
    </v-table>
    <template v-if="currencies?.data">
      <div class="text-center">
        <v-pagination
          v-model="currencies.current_page"
          :length="currencies.last_page"
          :total-visible="7"
          @update:model-value="onPageChange"
        ></v-pagination>
      </div>
    </template>

    <v-snackbar 
      v-model="state.snackbar" 
      :timeout="5000" 
      :color="state.snackbar === 'success' ? 'teal-lighten-1' : 'pink-lighten-4'"
      :update:modelValue="() => console.log('hell')"
      class="d-flex justify-end"

    >
      <div class="d-flex justify-start align-center">

        <v-icon class="v-snackbar__icon mr-4">mdi-bell</v-icon>
        <span class="v-snackbar__text ">{{ state.snackbar === 'success' ? state.success : state.error }}</span>
        <v-btn
            :color="state.snackbar === 'success' ? 'teal-darken-4' : 'pink-darken-4'"
            variant="tonal"
            @click="state.snackbar = false"
            class="ml-auto"
        >
            <v-icon icon="mdi-window-close"  title="Fermer"></v-icon>
        </v-btn>
      </div>
    </v-snackbar>
  </v-container>

</template>