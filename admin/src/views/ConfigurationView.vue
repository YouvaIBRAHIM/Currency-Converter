<script setup>
import { ref } from "vue";
import { store } from "@/services/auth.js";
import Config from "@/components/api/Config.vue";

</script>

<template>
  <v-container class="d-flex justify-space-around">
    <Config />
  </v-container>
</template>


