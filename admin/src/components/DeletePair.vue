<script setup>
import { toRefs } from 'vue';
const props = defineProps(['onDeletePair', 'pairToDelete', 'showDeletePair'])
const { showDeletePair, onDeletePair } = toRefs(props);

</script>
<template>
    <v-row justify="center">
      <v-dialog
        v-model="props.pairToDelete"
        persistent
        min-width="300"
        max-width="550"      
      >
        <v-card>
          <v-card-title>
            <span class="text-h5">Attention</span>
          </v-card-title>
          <v-card-text>
            <v-container>
                <p v-if="props.pairToDelete">
                  Voulez-vous vraiment supprimer cette paire ({{ props.pairToDelete.from_currency.name }} => {{ props.pairToDelete.to_currency.name }}) ?
                </p>
            </v-container>
            <small>Cette action est irréversible</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue-darken-1"
              variant="text"
              @click="() => showDeletePair(false)"
            >
              Fermer
            </v-btn>
            <v-btn
              color="red-darken-1"
              variant="text"
              @click="() => onDeletePair(props.pairToDelete?.id)"
            >
              Supprimer
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
</template>
  