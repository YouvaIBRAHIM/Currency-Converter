<script setup>
import { ref, watch } from "vue";
import { setApiConfig } from "@/services/api.js";
import { useApiConfig  } from "@/composables/api.js";

const state = ref({success : null, error : null, snackbar: false});
const config = ref(null);

useApiConfig(config, state);

const form = ref({
  enabled: config?.value?.enabled,
  maintenanceMessage: config?.value?.maintenance_message,
});

watch(config, () => {
    form.value.enabled = config?.value?.enabled
    form.value.maintenanceMessage = config?.value?.maintenance_message
})

const rules = {
  required: (value) => value?.trim() !== "" ? true : "Champ obligatoire",
}

const onSaveButton = async () => {
    const data = {
        enabled: form.value.enabled,
        message: form.value.maintenanceMessage,
    }

    try {
        const response = await setApiConfig(data);
        state.value.success = response
        state.value.snackbar = "success"
    } catch (err) {
        state.value.snackbar = "error"
        state.value.error = err?.response?.data?.message ? err?.response?.data.message[0] : err.message
    }
}
</script>

<template>
  <div>
    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      min-width="360"
      rounded="lg"
    >
      <v-card-title>
        API
      </v-card-title>
      <v-form @submit.prevent="onSaveButton()">
        <v-switch
          v-model="form.enabled"
          hide-details
          :label="`${form.enabled ? 'Disponible' : 'En maintenance'}`"
        ></v-switch>

        <v-textarea
          name="input-7-1"
          variant="filled"
          label="Message de maintenance"
          auto-grow
          model-value=""
          v-model="form.maintenanceMessage"
          :rules="[rules.required]"
        ></v-textarea>
        
        <v-btn block type="submit" class="mb-8" color="blue" size="large" variant="tonal">
          Sauvegarder
        </v-btn>
      </v-form>
    </v-card>
    
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
  </div>
</template>


