<script setup>
import { toRefs } from 'vue';
const props = defineProps(['onDeleteCurrency', 'currencyToDelete', 'showDeleteCurrency'])
const { showDeleteCurrency, onDeleteCurrency } = toRefs(props);

</script>
<template>
    <v-row justify="center">
      <v-dialog
        v-model="props.currencyToDelete"
        persistent
        width="300"
      >
        <v-card>
          <v-card-title>
            <span class="text-h5">Attention</span>
          </v-card-title>
          <v-card-text>
            <v-container>
                <p v-if="props.currencyToDelete?.name">
                    Voulez-vous vraiment supprimer le {{ props.currencyToDelete.name }} ({{ props.currencyToDelete.code }}) ?
                </p>
            </v-container>
            <small>Cette action est irréversible</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue-darken-1"
              variant="text"
              @click="() => showDeleteCurrency(false)"
            >
              Fermer
            </v-btn>
            <v-btn
              color="red-darken-1"
              variant="text"
              @click="() => onDeleteCurrency(props.currencyToDelete?.id)"
            >
              Supprimer
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
</template>
  