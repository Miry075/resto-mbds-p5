<template>
    <v-card>
        <v-card-title>
        <!-- Recherche -->
        <v-spacer></v-spacer>
        <v-text-field
            v-model="search"
            append-icon="search"
            label="Recherche"
            single-line
            hide-details
        ></v-text-field>
        </v-card-title>
        <v-data-table :headers="mainHeaders"
            :items="listOfPlats"
            item-key="name"
            v-model="selected"
            expands
            ref="dTable"
            class="elevation-1">
            <template slot="items" scope="props">
                <tr @click="clickRow(props.item)">
                    <!-- <td class="text-xs">{{ props.item.type }}</td> -->
                    <td class="text-xs"><v-img v-bind:src="`${props.item.image}`" aspect-ratio="2.75"></v-img></td>
                    <td class="text-xs">{{ props.item.name }}</td>
                    <td class="text-xs">{{ formatPrice(props.item.prix) }}</td>
                </tr>
            </template>
            <template slot="expand" scope="props">
                <v-card class="elevation-10">
                    <v-img v-bind:src="`${props.item.image}`" aspect-ratio="2.75"></v-img>
                    <v-card-title primary-title>
                        <div>
                            <h3 class="headline mb-0">{{ props.item.name }}</h3>
                            <div> Description du plat </div>
                        </div>
                    </v-card-title>

                    <v-card-actions>
                        <v-layout row wrap>
                            <v-flex xs6>
                                <v-text-field type="number" min="1" v-model="numberOfOrder" label="Quantité" outline></v-text-field>
                            </v-flex>
                            <v-flex xs6>
                                <div class="text-xs-center align-center">
                                    <v-btn outline color="indigo" @click="addToOrder(props.item)">Ajouter</v-btn>
                                </div>
                            </v-flex>
                        </v-layout>
                    </v-card-actions>
                </v-card>
            </template>
            <template v-slot:pageText="props">
            Lignes {{ props.pageStart }} - {{ props.pageStop }} de {{ props.itemsLength }}
            </template>
        </v-data-table>
    </v-card>  
</template>

<script src="./list-plat-component.js"></script>
<style src="./list-plat-style.css"></style>
