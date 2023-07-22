<script setup>
import CurrencyLine from "@/components/CurrencyLine.vue";
import NewCurrency, { dialog } from "@/components/NewCurrency.vue";
import { useCurrencies } from "@/composables/currencies";
import { addCurrency, deleteCurrency, updateCurrency } from "@/services/api";
import router from "@/router";
import { ref, watch } from "vue";
import DeleteCurrency from "@/components/DeleteCurrency.vue";

const page = ref(router?.currentRoute?.value?.query?.page ?? 1)
const currencies = ref(null);
const currencyToDelete = ref(null);
const state = ref({success : null, isLoading : false, error : null, snackbar: false});


useCurrencies(currencies, state, page.value);

watch(page, async (newValue) => {
  useCurrencies(currencies, state, newValue);
})

const onPageChange = (pageNumber) => {
  router.push(`/admin/currencies?page=${pageNumber}`)
  page.value = pageNumber
}

const onNewCurrency = async (form) => {
    state.value.isLoading = true;

    const data = {
        name: form.name,
        code: form.code
    }

    try {
      const response = await addCurrency(data);
      currencies.value.data = [response, ...currencies.value.data]
      state.value.snackbar = "success"
      state.value.success = `La devise ${response.name} (${response.code}) a été ajoutée`;
      dialog.value = false;
    } catch (err) {
      state.value.snackbar = "error"
      state.value.error = err?.response?.data ? err?.response?.data[0] : err.message;
    } finally {
      state.value.isLoading = false;
    }
}

const showDeleteCurrency = (currency = null) => {
  currencyToDelete.value = currency
}

const onDeleteCurrency = async(id) => {
    try {
      const response = await deleteCurrency(id)
      state.value.success = response;
      currencies.value.data = currencies.value.data.filter(currency => id !== currency.id)
      state.value.snackbar = "success"
      showDeleteCurrency(false)
    } catch (err) {
      state.value.snackbar = "error"

      state.value.error = err?.response?.data ? err?.response?.data[0] : err.message;
    } 
}

const onUpdateButton = async (form, currency, edit, currencyStatus) => {
    currencyStatus.isLoading = true;

    const data = {
        name: form.name,
        code: form.code
    }

    try {
        const response = await updateCurrency(currency.id, data);
        state.value.success = response;
        state.value.snackbar = "success"
        currency.name = data.name;
        currency.code = data.code;
        edit(false)
    } catch (err) {
        state.value.snackbar = "error"
        state.value.error = err?.response?.data ? err?.response?.data[0] : err.message;
    } finally {
        currencyStatus.isLoading = false;
    }
}

const formRules = {
  required: (value) => value?.trim() !== "" ? true : "Champ obligatoire",
  codeFormat: (value) => value?.trim().length === 3 ? true : "Le code doit contenir 3 caractères",
}


</script>

<template>
  <v-container>
    <h3 class="font-weight-light">
      Devises
    </h3>
    <NewCurrency :onNewCurrency="onNewCurrency" :rules="formRules"/>
    <v-table
      fixed-header
      height="70vh"
    >
      <thead>
        <tr>
          <th class="text-left">
            Nom
          </th>
          <th class="text-left">
            Code
          </th>
          <th class="text-right">
            Actions
          </th>
        </tr>
      </thead>
      <template v-if="state.isLoading">
        <v-skeleton-loader  v-for="n in 5" :key="n"
          type="table-row-divider"
          class="ma-auto"
        />
      </template>

      <template v-else-if="currencies?.data">
        <tbody>
          <CurrencyLine
            v-for="currency in currencies.data"
            :key="currency.id"
            :currency="currency"
            :onUpdateButton="onUpdateButton"
            :showDeleteCurrency="showDeleteCurrency"
            :rules="formRules"
            :state="state"
          />
        </tbody>
      </template>
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
    <DeleteCurrency :onDeleteCurrency="onDeleteCurrency" :currencyToDelete="currencyToDelete" :showDeleteCurrency="showDeleteCurrency"/>

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