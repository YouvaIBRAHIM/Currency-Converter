<script setup>
import { ref } from 'vue';
import ApiTester from "@/components/public/ApiTester.vue";
const drawer = ref(true);


</script>

<template>
        <v-layout>
          <v-navigation-drawer
            v-model="drawer"
            location="right"
            sticky
            class="drawer"
            color="#f5f1ed"

          >
            <ApiTester />

          </v-navigation-drawer>
          <v-main class="main">
            <v-card
              class="mx-auto"
            >
              <v-img
                class="align-end text-white"
                height="200"
                src="../../public/img/money_value_logo.svg"
                cover
              >
                <v-card-title :style="{ color: '#000000' }">Votre partenaire de conversion monétaire</v-card-title>
              </v-img>

              <v-card-subtitle class="pt-4">
                Dernière mise à jour : 24/07/2023
              </v-card-subtitle>

              <v-card-text>
                <div>Whitehaven Beach</div>

                <div>Whitsunday Island, Whitsunday Islands</div>
              </v-card-text>
            </v-card>

          </v-main>
        </v-layout>

      <div class="d-flex justify-center align-center h-100">
        <v-btn
          color="primary"
          @click.stop="drawer = !drawer"
        >
          Toggle
        </v-btn>
      </div>
</template>

<style>
.main,
.drawer{
  min-height: 90vh;
}

.drawer{
  min-width: 350px;

}
</style>