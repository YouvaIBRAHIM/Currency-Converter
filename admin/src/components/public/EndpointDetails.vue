<script setup>
import JsonViewer from '@/components/public/JsonViewer.vue';

const props = defineProps([ 'endpoint', 'description', 'onOpenDrawer'])

</script>
<template>
    <v-divider></v-divider>

    <v-container class="d-flex flex-column justify-start align-start">
        <v-toolbar-title>
            {{ props.description?.title }}
        </v-toolbar-title>
        
        <div class="ma-2 d-flex align-center">
            <v-chip
                class="ma-2"
                label
                color="blue-darken-4"
            >
                GET
            </v-chip>
            :
            <v-code>
                <p class="text-decoration-underline endpoint"  @click="props.onOpenDrawer">
                    {{ props.endpoint }}
                </p>
            </v-code>
        </div>


        <v-container
            v-if="props.description?.details"
            class="bg-blue"
            color="grey-darken-1"
        >
            {{ props.description?.details }}
        </v-container>
        <v-container v-if="props.description?.params">
            <v-chip
                class="ma-2"
                color="grey-darken-1"
            >
                Paramètres
            </v-chip>

            <v-table>
                <thead>
                <tr>
                    <th class="text-left">
                        Paramètre
                    </th>
                    <th class="text-left">
                        Type
                    </th>
                    <th class="text-left">
                        Exigeance
                    </th>
                    <th class="text-left">
                        Description
                    </th>
                </tr>
                </thead>
                <tbody>
                    <tr  v-for="(value, key) in props.description?.params">
                        <td>{{ key }}</td>
                        <td class="text-no-wrap">
                            <v-chip
                                class="ma-2"
                                color="grey-darken-1"
                            >
                                {{value.type}}
                            </v-chip>
                        </td>
                        <td>{{value.requirement}}</td>
                        <td>
                            {{value.description}} 
                        </td>
                    </tr>
                </tbody>
            </v-table>
        </v-container>

        <v-chip
            class="ma-2"
            color="grey-darken-1"
        >
            Données renvoyées
        </v-chip>

        <v-table>
            <thead>
            <tr>
                <th class="text-left">
                    Clé
                </th>
                <th class="text-left">
                    Type
                </th>
                <th class="text-left">
                    Description
                </th>
            </tr>
            </thead>
            <tbody>
                <tr v-for="(value, key) in props.description?.data">
                    <td>{{key}}</td>
                    <td class="text-no-wrap">
                        <v-chip
                            class="ma-2"
                            color="grey-darken-1"
                        >
                            {{ value.type }}
                        </v-chip>
                    </td>
                    <td>
                        {{ value.description }} 
                    </td>
                </tr>
            </tbody>
        </v-table>

        <v-btn color="blue-darken-4" class="ma-2" variant="tonal" @click="props.onOpenDrawer">
            ESSAYER
        </v-btn>
    </v-container>

    <v-chip
        class="ma-2"
        color="grey-darken-1"
    >
        Exemple de réponse
    </v-chip>

    <v-divider></v-divider>

    <div class="status">
        <span> Statut : <strong class="success">200 / OK</strong></span>
    </div>

    <json-viewer :json="props.description.example" />


    <template v-if="props.description.errorExample">
        <v-chip
            class="ma-2"
            color="grey-darken-1"
        >
            Exemple de message d'erreur
        </v-chip>

        <v-divider></v-divider>

        <div class="status">
            <span> Statut : <strong class="error">405 / Method Not Allowed</strong></span>
        </div>

        <json-viewer :json="props.description.errorExample" />
    </template>
    

</template>

<style>

.status{
    height: 30px;
    padding-left: 1rem;
    display: flex;
    align-items: center;
}

.status .success{
    color: #6ac510;
}

.status .error{
    color: #cc3b3b;
}

.endpoint{
    font-size: 18px;
    cursor: pointer;

}

.endpoint:hover{
    color: rgb(56, 56, 194);
}


</style>