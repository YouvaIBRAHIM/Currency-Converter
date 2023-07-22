<script setup>
const props = defineProps(['cell']);
const cell = Number(props.cell)

</script>

<template>
    <td v-for="n in cell" :key="n">
        <v-skeleton-loader
            type="text"
            class="ma-auto"
        />
    </td>
</template>