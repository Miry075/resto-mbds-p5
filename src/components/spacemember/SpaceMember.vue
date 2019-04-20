<template>
    <v-layout>
        
        <SpinnerLoader v-bind:isLoading="isLoading" v-bind:message="message"></SpinnerLoader>
        <v-flex md12>
            <h1>Mes Commandes</h1>
            <v-data-table
                :headers="mainHeaders"
                :items="orders"
                class="elevation-1"
            >
            <template v-slot:items="props">
                 <td class="text-xs-right"><v-img v-bind:src="`${props.item.image}`" aspect-ratio="2.75"></v-img></td>
                <td class="text-xs-right">{{ props.item.name }}</td>
                <td class="text-xs-right">{{ props.item.type }}</td> 
                <td class="text-xs-right">{{ formatPrice(props.item.prix) }}</td> 
                <td class="text-xs-right">{{ props.item.quantite }}</td> 
                <td class="text-xs-right">{{ formatPrice(props.item.prixTotal) }}</td> 
                <td class="text-xs-right"> 
                    <v-btn slot="activator" @click="goToForm(props.item)" flat color="rgba(0, 0, 0, 0.87)">
                         Details
                    </v-btn>
                </td>
                </template>
                <template v-slot:pageText="props">
                Lignes {{ props.pageStart }} - {{ props.pageStop }} de {{ props.itemsLength }}
                </template>
            </v-data-table>
        </v-flex>
    </v-layout>
</template>

<script src="./space-member-component.js"></script>
<style src="./space-member-style.css"></style>
