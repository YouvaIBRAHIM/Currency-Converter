<script setup>
import NavBar from "@/components/NavBar.vue";
import { store } from "@/services/auth.js";

</script>

<template>
  <v-layout>
    <header>
      <NavBar v-if="store.user"/>
    </header>
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-layout>
</template>
