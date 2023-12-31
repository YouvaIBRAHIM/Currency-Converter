<script setup>
import PairLine from "@/components/PairLine.vue";
import NewPair, { dialog } from "@/components/NewPair.vue";
import { usePairs } from "@/composables/pairs";
import { addPair, deletePair, updatePair } from "@/services/api";
import router from "@/router";
import { ref, watch } from "vue";
import DeletePair from "@/components/DeletePair.vue";
import TableSkeletonLoader from "@/components/TableSkeletonLoader.vue";
import { useTitle } from "@vueuse/core";

useTitle("Paires - Money Value");

const page = ref(router?.currentRoute?.value?.query?.page ?? 1)
const pairs = ref(null);
const pairToDelete = ref(null);
const state = ref({success : null, isLoading : false, error : null, snackbar: false});


usePairs(pairs, state, page.value);

watch(page, async (newValue) => {
  usePairs(pairs, state, newValue);
})

//change de page quand on clique sur un bouton de la pagination
const onPageChange = (pageNumber) => {
  router.push(`/admin/pairs?page=${pageNumber}`)
  page.value = pageNumber
}

/**
 * Ajoute une nouvelle paire quand on soumet le formulaire
 * @param {*} form Contient les informations saisis par l'utilisateur
 */
const onNewPair = async (form) => {
    state.value.isLoading = true;

    const data = {
        from_id: form.newFromCurrency,
        to_id: form.newToCurrency,
        currency_rate: form.newCurrencyRate
    }

    try {
      const response = await addPair(data);
      pairs.value.data = [response, ...pairs.value.data]
      state.value.snackbar = "success"
      state.value.success = `La paire a été ajoutée`;
      dialog.value = false;
    } catch (err) {
      state.value.snackbar = "error"
      state.value.error = err?.response?.data ? err?.response?.data[0] : err.message;
    } finally {
      state.value.isLoading = false;
    }
}

/**
 * Permet d'afficher une modal de confirmation
 * @param {Object} currency contient les imformations de la paire qu'on souhaite supprimer
 */
const showDeletePair = (pair = null) => {
  pairToDelete.value = pair
}

/**
 * supprime une paire quand on confirme
 * @param {id} form Contient l'id de la paire à supprimer
 */
const onDeletePair = async(id) => {
    try {
      const response = await deletePair(id)
      state.value.success = response;
      pairs.value.data = pairs.value.data.filter(pair => id !== pair.id)
      state.value.snackbar = "success"
      showDeletePair(false)
    } catch (err) {
      state.value.snackbar = "error"
      state.value.error = err?.response?.data ? err?.response?.data[0] : err.message;
    } 
}

/**
 * Met à jour une paire
 * @param {Object} form Contient les nouvelles valeurs de la paire
 * @param {String} pair Contient les valeurs initiales de la paire
 * @param {Function} edit Fait disparaitre les champs
 * @param {Object} pairStatus Determine si la modification a réussi
 */
const onUpdateButton = async (form, pair, edit, pairStatus) => {
    pairStatus.isLoading = true;

    const data = {
        from_id: form.newFromCurrency,
        to_id: form.newToCurrency,
        currency_rate: form.newCurrencyRate
    }

    try {
        const response = await updatePair(pair.id, data);
        state.value.success = response;
        state.value.snackbar = "success"
        edit(false)
        return true;
    } catch (err) {
        state.value.snackbar = "error"
        state.value.error = err?.response?.data ? err?.response?.data[0] : err.message;
        return false;
    } finally {
        pairStatus.isLoading = false;
    }
}

const formRules = {
  required: (value) => value ? true : "Champ obligatoire",
  currencyRateFormat: (value) => Number(value) == value ? true : "Le taux de change doit être nombre",
}


</script>

<template>
  <v-container>
    <h3 class="font-weight-light">
      Paires
    </h3>
    <NewPair :onNewPair="onNewPair" :rules="formRules"/>
    <v-table
      fixed-header
      height="70vh"
    >
      <thead>
        <tr>
          <th class="text-left">
            Source
          </th>
          <th class="text-left">
            Destinataire
          </th>
          <th class="text-left">
            Taux de change
          </th>
          <th class="text-left">
            Appels API
          </th>
          <th class="text-right">
            Actions
          </th>
        </tr>
      </thead>
      
      <tbody>
        <template v-if="state.isLoading">
          <tr v-for="n in 5" :key="n">
            <TableSkeletonLoader cell="5"/>
          </tr>
        </template>
        <template v-else-if="pairs?.data">
            <PairLine
              v-for="pair in pairs.data"
              :key="pair.id"
              :pair="pair"
              :onUpdateButton="onUpdateButton"
              :showDeletePair="showDeletePair"
              :rules="formRules"
              :state="state"
            />
        </template>
      </tbody>
    </v-table>
    <template v-if="pairs?.data">
      <div class="text-center">
        <v-pagination
          v-model="pairs.current_page"
          :length="pairs.last_page"
          :total-visible="7"
          @update:model-value="onPageChange"
        ></v-pagination>
      </div>
    </template>
    <DeletePair :onDeletePair="onDeletePair" :pairToDelete="pairToDelete" :showDeletePair="showDeletePair"/>

    <v-snackbar 
      v-model="state.snackbar" 
      :timeout="5000" 
      :color="state.snackbar === 'success' ? 'teal-lighten-1' : 'pink-lighten-4'"
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