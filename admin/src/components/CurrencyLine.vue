<script setup>
import { toRefs, ref } from 'vue';
import { updateCurrency } from "@/services/api";
import Alert from "@/components/Alert.vue";


const props = defineProps(['currency', 'showDeleteCurrency']);

const { currency } = toRefs(props);
const isEditing = ref(false)

const form = ref({name : currency.value.name, code: currency.value.code});
const currencyStatus = ref({success : null, isLoading : false, error : null});

const rules = {
  required: (value) => value?.trim() !== "" ? true : "Champ obligatoire",
  codeFormat: (value) => value?.trim().length === 3 ? true : "Le code doit contenir 3 caractères",
}

const onEditButton = () => {
    isEditing.value = true
}

const onCancelButton = () => {
    isEditing.value = false
}

const onUpdateButton = async (id) => {
    currencyStatus.value.isLoading = true;

    const data = {
        name: form.value.name,
        code: form.value.code
    }

    try {
        const response = await updateCurrency(id, data);
        currencyStatus.value.success = response;
        currency.value.name = data.name;
        currency.value.code = data.code;
        isEditing.value = false
    } catch (err) {
        currencyStatus.value.error = err?.response?.data ? err?.response?.data[0] : err.message;
    } finally {
        currencyStatus.value.isLoading = false;
    }
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
                    :rules="[rules.required]"
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
                    :rules="[rules.codeFormat]"
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
                    <v-btn color="indigo-darken-1" @click="() => onUpdateButton(currency.id)">
                        <v-icon icon="mdi-content-save" title="Enregistrer"></v-icon>
                        <v-tooltip
                            activator="parent"
                            location="top"
                        >Enregistrer</v-tooltip>
                    </v-btn>
                </div>
                <div class="pa-2 action">
                    <v-btn color="yellow-darken-1"  @click="onCancelButton">
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
                    <v-btn color="indigo-darken-1" @click="onEditButton">
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

        <Alert type="success" :content="currencyStatus.success"/>
        <Alert type="error" :content="currencyStatus.error"/>

    </tr>
</template>

<style scoped>
td{
    min-width: 250px;
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