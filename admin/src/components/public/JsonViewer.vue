<script setup>
import jsonColorizer from "@/services/jsonViewer.js"
const props = defineProps(['json'])

</script>

<template>
    <v-divider></v-divider>
    <div>
        <pre v-html="jsonColorizer.prettyPrint(props.json)"></pre>
    </div>
    <v-divider></v-divider>
</template>

<style >
pre {
	background-color: #1a1a1a;
	color: whitesmoke;
	padding: 15px;
    font-size: 12px;
	box-shadow: 0 0 10px black;
    max-height: 75vh!important;
    overflow: auto;
    margin: 10px;
}
pre span.json-key {
	color: #a0dbfc!important;
}
pre .json-number {
	color: #b6ceaa!important;
}
pre .json-string {
	color: #cc927b!important;
}
pre .json-boolean {
	color: #5b9bd2!important;
}

</style>