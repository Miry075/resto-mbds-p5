<template>
    <v-data-table :headers="mainHeaders"
        :items="orders"
        item-key="name"
        hide-actions
        expand
        ref="dTable"
        class="elevation-1">
        <template slot="items" scope="props">
            <tr @click="props.expanded = !props.expanded">
                <td class="text-xs"><v-img v-bind:src="`${props.item.image}`" aspect-ratio="2.75"></v-img></td>
                <td class="text-xs">{{ props.item.name }}</td>
                <td class="text-xs">{{ props.item.type }}</td>
                <td class="text-xs">{{ props.item.prix }}</td>
                <td class="text-xs">{{ props.item.quantite }}</td>
                <td class="text-xs">{{ props.item.prix  * props.item.quantite }}</td>
            </tr>
        </template>
        <template slot="expand" scope="props">
            <v-card class="elevation-10">
                <v-img v-bind:src="`${props.item.image}`" aspect-ratio="2.75"></v-img>

                <v-card-title primary-title>
                    <div>
                        <h3 class="headline mb-0">Nom du plat</h3>
                        <div> Description du plat </div>
                    </div>
                </v-card-title>

                <v-card-actions>
                    <v-layout row wrap>
                        <v-flex xs6>
                            <v-text-field type="number" v-model="numberOfOrder" min="1" max="`${props.item.quantite}`" label="Quantité" outline></v-text-field>
                        </v-flex>
                        <v-flex xs6>
                            <div class="text-xs-center align-center">
                                <v-btn flat @click="removeOrder(props.item, numberOfOrder)" color="orange">Enlever</v-btn>
                            </div>
                        </v-flex>
                    </v-layout>
                </v-card-actions>
            </v-card>
        </template>
    </v-data-table>  
</template>

<script src="./list-order-component.js"></script>
<style src="./list-order-style.css"></style>
