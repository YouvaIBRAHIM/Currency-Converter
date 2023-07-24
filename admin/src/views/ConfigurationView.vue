<script setup>
import Config from "@/components/api/Config.vue";
import { useTitle } from "@vueuse/core";

useTitle("Configuration - Money Value");

</script>

<template>
  <v-container class="d-flex justify-space-around">
    <Config />
  </v-container>
</template>


