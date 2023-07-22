<script>
export const dialog = ref(false);
</script>
<script setup>
import { useCurrencies } from "@/composables/currencies";
import { ref } from 'vue';

const { onNewPair, rules } = defineProps(['onNewPair', 'rules']);

const currencies = ref(null);
const state = ref({success : null, isLoading : false, error : null, snackbar: false});

useCurrencies(currencies, state);

const form = ref({
    newFromCurrency: null,
    newToCurrency: null,
    newCurrencyRate: 0,
});

</script>
<template>
  <v-row justify="end" class="newPairButton">
    <v-dialog
      v-model="dialog"
      width="300"
    >
      <template v-slot:activator="{ props }">
        <v-btn
          color="blue-darken-1"
          v-bind="props"
        >
          Ajouter une pair
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Nouvelle devise</span>
        </v-card-title>
        <v-form  @submit.prevent="onNewPair(form)">
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-autocomplete
                      v-model="form.newFromCurrency"
                      :items="currencies ?? []"
                      item-title="name"
                      item-value="id"
                      density="compact"
                      label="Source"
                      :rules="[rules.required]"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12">
                  <v-autocomplete
                      v-model="form.newToCurrency"
                      :items="currencies ?? []"
                      item-title="name"
                      item-value="id"
                      density="compact"
                      label="Destinataire"
                      :rules="[rules.required]"
                  ></v-autocomplete>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                      class="mt-5"
                      density="compact"
                      label="Taut de change"
                      type="number"
                      variant="filled"
                      v-model="form.newCurrencyRate"
                      :rules="[rules.required, rules.currencyRateFormat]"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small>*indique que le champ est obligatoire</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="red-darken-1"
              variant="text"
              @click="dialog = false"
            >
              Fermer
            </v-btn>
            <v-btn
              color="blue-darken-1"
              variant="text"
              type="submit"
            >
              Ajouter
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<style scoped>
.newPairButton{
  margin: 1rem;
}
</style>