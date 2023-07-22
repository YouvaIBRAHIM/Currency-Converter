<script setup>
import CurrencyLine from "@/components/CurrencyLine.vue";
import NewCurrency, { dialog } from "@/components/NewCurrency.vue";
import { useCurrencies } from "@/composables/currencies";
import { addCurrency, deleteCurrency } from "@/services/api";
import router from "@/router";
import { ref, watch } from "vue";
import DeleteCurrency from "@/components/DeleteCurrency.vue";
import Alert from "@/components/Alert.vue";

const page = ref(router?.currentRoute?.value?.query?.page ?? 1)
const currencies = ref(null);
const isLoading = ref(false);
const error = ref(null);
const currencyToDelete = ref(null);

useCurrencies(currencies, isLoading, error, page.value);

watch(page, async (newValue) => {
  useCurrencies(currencies, isLoading, error, newValue);
})

const onPageChange = (pageNumber) => {
  router.push(`/admin/currencies?page=${pageNumber}`)
  page.value = pageNumber
}

const onNewCurrency = async (form) => {
    isLoading.value = true;

    const data = {
        name: form.name,
        code: form.code
    }

    try {
      const response = await addCurrency(data);
      currencies.value.data = [response, ...currencies.value.data]
      dialog.value = false;
    } catch (err) {
      console.log("🚀 ~ file: CurrenciesView.vue:23 ~ onNewCurrency ~ err:", err)
      error.value = err?.response?.data ? err?.response?.data[0] : err.message;
    } finally {
      isLoading.value = false;
    }
}

const showDeleteCurrency = (currency = null) => {
  currencyToDelete.value = currency
}

const onDeleteCurrency = async(id) => {
    try {
        const response = await deleteCurrency(id)
        console.log("🚀 ~ file: DeleteCurrency.vue:10 ~ onDeleteCurrency ~ response:", response)
        currencies.value.data = currencies.value.data.filter(currency => id !== currency.id)
        showDeleteCurrency(false)
    } catch (err) {
      error.value = err?.response?.data ? err?.response?.data[0] : err.message;
    }
}
</script>

<template>
  <v-container>
    <h3 class="font-weight-light">
      Devises
    </h3>
    <NewCurrency :onNewCurrency="onNewCurrency"/>
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
      <template v-if="isLoading">
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
            :showDeleteCurrency="showDeleteCurrency"
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
    <Alert type="error" :content="error"/>
    <DeleteCurrency :onDeleteCurrency="onDeleteCurrency" :currencyToDelete="currencyToDelete" :showDeleteCurrency="showDeleteCurrency"/>
  </v-container>

</template>