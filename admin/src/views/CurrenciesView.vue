<script setup>
import CurrencyLine from "@/components/CurrencyLine.vue"
import { useCurrencies } from "@/composables/currencies";

const { currencies, isLoading, error } = useCurrencies();

</script>

<template>

  <v-container>
    <h3 class="font-weight-light">
      Devises
    </h3>

    <v-table
      fixed-header
      height="80vh"
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

      <template v-if="currencies">
        <tbody>
          <CurrencyLine
            v-for="currency in currencies"
            :key="currency.id"
            :currency="currency"
            
          />
        </tbody>
      </template>
      <template v-else-if="isLoading">
        <v-skeleton-loader  v-for="n in 5" :key="n"
          type="table-row-divider"
          class="ma-auto"
        />
      </template>
    </v-table>
    
  </v-container>

</template>