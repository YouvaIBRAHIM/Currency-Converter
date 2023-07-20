<script setup>
import { toRefs, defineProps, ref } from 'vue';


const props = defineProps(['currency']);

const { currency } = toRefs(props);
const isEditing = ref(false)

const form = ref({name : currency.value.name, code: currency.value.code});

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

const onUpdateButton = () => {
    
}
</script>

<template>
    <tr>
        <template v-if="isEditing">
            <td>
                <v-text-field
                    class="mt-5"
                    density="compact"
                    placeholder="Nom"
                    type="text"
                    variant="outlined"
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
                    variant="outlined"
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
                    <v-btn color="indigo-darken-1" @click="onUpdateButton">
                        <v-icon icon="mdi-content-save" title="Enregistrer"></v-icon>
                        <v-tooltip
                            activator="parent"
                            location="top"
                        >Modifier</v-tooltip>
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
                    <v-btn color="red-darken-1">
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
.actions{
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

.action{
    width: 65px!important;
}

.form-input >>> .error--text {
    position: absolute;
    right: 0;
  color: rgba(255, 255, 255, 0.7) !important;
}
</style>