<script setup>

const props = defineProps(['currency']);
const currency = props.currency;

</script>

<template>

    <tr v-if="currency.pairs">

        <td>{{ currency.name }} ({{ currency.code.toUpperCase() }})</td>

        <td>
            <v-list-item
                v-for="pair in currency.pairs"
                :key="pair.code"
            >
                <v-list-item-title v-text="`${pair.name} (${pair.code.toUpperCase()})`"></v-list-item-title>
            </v-list-item>
        </td>

        <td>
            <v-list-item
                v-for="pair in currency.pairs"
                :key="pair.code"
            >
                <v-list-item-title v-text="pair.currency_rate"></v-list-item-title>
            </v-list-item>
        </td>

        <td>
            <v-list-item
                v-for="pair in currency.pairs"
                :key="pair.code"
            >
                <v-list-item-title v-text="pair.count"></v-list-item-title>
            </v-list-item>
        </td>

    </tr>
</template>

<style scoped>
td{
    min-width: 200px;
}
</style>