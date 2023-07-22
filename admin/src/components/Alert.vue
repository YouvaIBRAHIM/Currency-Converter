<script setup>
import { toRef } from 'vue';
import { ref, watch, computed } from 'vue';

const props = defineProps(["type", "content"])

const show = computed(() => props.content)
console.log("🚀 ~ file: Alert.vue:8 ~ show:", show)


</script>

<template>
    <v-snackbar
        v-model="show"
        :timeout="5000"
        :color="props.type === 'success' ? 'blue-darken-4' : 'red-darken-4'"
        variant="tonal"
    >
        {{ content }}
        <template v-slot:actions>
            <v-btn
                :color="props.type === 'success' ? 'success' : 'pink'"
                variant="text"
                @click="show = false"
            >
                <v-icon icon="mdi-window-close" title="Fermer"></v-icon>
            </v-btn>
        </template>
    </v-snackbar>
</template>