<script setup>
import { toRefs, ref } from 'vue';
import { useCurrencies } from "@/composables/currencies";
import TableSkeletonLoader from "@/components/TableSkeletonLoader.vue";
const props = defineProps(['pair', 'onUpdateButton', 'showDeletePair', "rules", "state"]);

const { pair } = toRefs(props);
const isEditing = ref(false);
const currencies = ref(null);
const state = ref({success : null, isLoading : false, error : null, snackbar: false});


const form = ref({
    newFromCurrency: pair.value.from_currency.id,
    newToCurrency: pair.value.to_currency.id,
    newCurrencyRate: pair.value.currency_rate,
});

const pairStatus = ref({isLoading : false});

//permet d'afficher ou non les champs de modification et de récupérer les devises pour pouvoir les séléctionner
const edit = (value = false) => {
    isEditing.value = value
    if (isEditing.value === true && currencies.value == null) {
        useCurrencies(currencies, state)
    }
}

/**
 * Met à jour une paire
 * @param {Object} form Contient les nouvelles valeurs de la paire
 * @param {String} pair Contient les valeurs initiales de la paire
 * @param {Function} edit Fait disparaitre les champs
 * @param {Object} pairStatus Determine si la modification a réussi
 */
const onUpdateButton = async (form, pair, edit, pairStatus) => {
    const success = await props.onUpdateButton(form, pair, edit, pairStatus);

    if (success) {
        // Si la source ou/et le destinataire d'une paire sont modifiés, Le décompte des appels API sera remis à 0
        if (pair.from_id !== form.newFromCurrency || pair.to_id !== form.newToCurrency) {
            pair.count.count = 0;
        }

        pair.from_id = form.newFromCurrency;
        pair.to_id = form.newToCurrency;
        pair.currency_rate = form.newCurrencyRate;
        if (currencies) {
            pair.from_currency = currencies.value.find(currency => currency.id === form.newFromCurrency) 
            pair.to_currency = currencies.value.find(currency => currency.id === form.newToCurrency) 
        }
    }
}
</script>

<template>
    <v-progress-linear
        v-if="pairStatus.isLoading"
        class="progressLinear"
        indeterminate
        color="yellow-darken-2"
    ></v-progress-linear>
    <tr>
        <template v-if="isEditing">
            <template v-if="state.isLoading">
                <TableSkeletonLoader  cell="3"/>
            </template>
            <template v-else>
                <td>
                    <v-autocomplete
                        v-model="form.newFromCurrency"
                        :items="currencies ?? []"
                        item-title="name"
                        item-value="id"
                        density="compact"
                        label="Source"
                        hide-details=""
                    ></v-autocomplete>
                </td>
                <td>
                    <v-autocomplete
                        v-model="form.newToCurrency"
                        :items="currencies ?? []"
                        item-title="name"
                        item-value="id"
                        density="compact"
                        label="Source"
                        hide-details=""
                    ></v-autocomplete>
                </td>
                <td>
                    <v-text-field
                        class="mt-5"
                        density="compact"
                        placeholder="Code"
                        type="number"
                        variant="filled"
                        v-model="form.newCurrencyRate"
                        :rules="[props.rules.currencyRateFormat]"
                    ></v-text-field>
                </td>
            </template>
        </template>
        <template v-else>
            <td>{{ pair.from_currency.name }} ({{ pair.from_currency.code }})</td>
            <td>{{ pair.to_currency.name }} ({{ pair.to_currency.code }})</td>
            <td>{{ pair.currency_rate }}</td>
        </template>
        <td>{{ pair?.count?.count ?? 0 }}</td>
        <td>
            <div class="actions" v-if="isEditing">
                <div class="pa-2 action">
                    <v-btn color="indigo-darken-1" @click="() => onUpdateButton(form, pair, edit, pairStatus)">
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
                    <v-btn color="red-darken-1" @click="() => props.showDeletePair(pair)">
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