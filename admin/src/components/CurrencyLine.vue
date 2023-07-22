<script setup>
import { toRefs, ref } from 'vue';


const props = defineProps(['currency', 'onUpdateButton', 'showDeleteCurrency', "rules", "state"]);

const { currency } = toRefs(props);
const isEditing = ref(false)

const form = ref({name : currency.value.name, code: currency.value.code});
const currencyStatus = ref({isLoading : false});

const edit = (state = false) => {
    isEditing.value = state
}


</script>

<template>
    <v-progress-linear
        v-if="currencyStatus.isLoading"
        class="progressLinear"
        indeterminate
        color="yellow-darken-2"
    ></v-progress-linear>
    <tr>
        <template v-if="isEditing">
            <td>
                <v-text-field
                    class="mt-5"
                    density="compact"
                    placeholder="Nom"
                    type="text"
                    variant="filled"
                    v-model="form.name"
                    :rules="[props.rules.required]"
                ></v-text-field>
            </td>
            <td class="mb-5">
                <v-text-field
                    class="mt-5"
                    density="compact"
                    placeholder="Code"
                    type="text"
                    variant="filled"
                    v-model="form.code"
                    :rules="[props.rules.codeFormat]"
                ></v-text-field>
            </td>
        </template>
        <template v-else>
            <td>{{ currency.name }}</td>
            <td>{{ currency.code.toUpperCase() }}</td>
        </template>
        <td>
            <div class="actions" v-if="isEditing">
                <div class="pa-2 action">
                    <v-btn color="indigo-darken-1" @click="() => props.onUpdateButton(form, currency, edit, currencyStatus)">
                        <v-icon icon="mdi-content-save" title="Enregistrer"></v-icon>
                        <v-tooltip
                            activator="parent"
                            location="top"
                        >Enregistrer</v-tooltip>
                    </v-btn>
                </div>
                <div class="pa-2 action">
                    <v-btn color="yellow-darken-1"  @click="() => edit(false)">
                        <v-icon icon="mdi-window-close" title="Annuler"></v-icon>
                        <v-tooltip
                            activator="parent"
                            location="top"
                        >Annuler</v-tooltip>
                    </v-btn>
                </div>
            </div>
            <div class="actions" v-else>
                <div class="pa-2 action">
                    <v-btn color="indigo-darken-1" @click="() => edit(true)">
                        <v-icon icon="mdi-pencil" title="Modifier"></v-icon>
                        <v-tooltip
                            activator="parent"
                            location="top"
                        >Modifier</v-tooltip>
                    </v-btn>
                </div>
                <div class="pa-2 action">
                    <v-btn color="red-darken-1" @click="() => props.showDeleteCurrency(currency)">
                        <v-icon icon="mdi-delete" title="Supprimer"></v-icon>
                        <v-tooltip
                            activator="parent"
                            location="top"
                        >Supprimer</v-tooltip>
                    </v-btn>
                </div>
            </div>
        </td>

    </tr>
</template>

<style scoped>
td{
    min-width: 200px;
}
.actions{
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

.action{
    width: 65px!important;
}

.progressLinear {
    transform: none!important;
}
</style>