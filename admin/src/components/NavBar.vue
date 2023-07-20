<script setup>
import { store } from "@/services/auth.js";

const user = store.user;
const randomColor = Math.floor(Math.random()*16777215).toString(16);
</script>
<template>
      <v-navigation-drawer
        expand-on-hover
        rail
        color="#22223b"
      >
        <v-list>
          <v-list-item
            :prepend-avatar="`https://ui-avatars.com/api/?background=${randomColor}&color=fff&name=${user.name}`"
            :title="user.name"
            :subtitle="user.email"
            base-color="#ffffff"
          ></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list  nav>
          <v-list-item base-color="#ffffff" prepend-icon="mdi-currency-eur" title="Devises" value="Currencies" to="/admin/currencies"></v-list-item>
          <v-list-item base-color="#ffffff" prepend-icon="mdi-swap-horizontal" title="Pairs" value="Pairs" to="/admin/pairs"></v-list-item>
        </v-list>
        <template v-slot:append>
          <div class="pa-2">
            <v-btn block color="red-darken-1"  @click="async () => await store.handleLogout()">
              <v-icon icon="mdi-logout" title="Déconnexion"></v-icon>
              <v-tooltip
                activator="parent"
                location="top"
              >Déconnexion</v-tooltip>
            </v-btn>
          </div>
        </template>
      </v-navigation-drawer>
</template>