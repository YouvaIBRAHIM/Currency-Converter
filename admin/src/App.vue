<script setup>
import NavBar from "@/components/NavBar.vue";
import { store } from "@/services/auth.js";

</script>

<template>
  <header>
    <NavBar  v-if="store.user"/>
  </header>
  <main>
    <router-view />
  </main>
</template>
