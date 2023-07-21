<script>
export const dialog = ref(false);
</script>
<script setup>

import { ref } from 'vue';

const { onNewCurrency } = defineProps(['onNewCurrency']);

const form = ref({
  name: null,
  code: null
});

const rules = {
  required: (value) => value?.trim() !== "" ? true : "Champ obligatoire",
  codeFormat: (value) => value?.trim().length === 3 ? true : "Le code doit contenir 3 caractères",
}

</script>
<template>
  <v-row justify="end" class="newCurrencyButton">
    <v-dialog
      v-model="dialog"
      persistent
      width="300"
    >
      <template v-slot:activator="{ props }">
        <v-btn
          color="blue-darken-1"
          v-bind="props"
        >
          Ajouter une devise
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Nouvelle devise</span>
        </v-card-title>
        <v-form  @submit.prevent="onNewCurrency(form)">
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Nom*"
                    v-model="form.name"
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Code*"
                    v-model="form.code"
                    :rules="[rules.codeFormat]"
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
.newCurrencyButton{
  margin: 1rem;
}
</style>