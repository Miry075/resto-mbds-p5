<template>
<div>
    <SpinnerLoader v-bind:isLoading="isLoading" v-bind:message="message"></SpinnerLoader>
     <v-dialog
        v-model="isDelete"
        persistent
        :width="options.width"
        v-bind:style="{ zIndex: options.zIndex }"
    >
        <v-card :color="options.color" dark>
            <v-card-text>
                Voulez vous vraiment poursuivre la suppression?
            </v-card-text>
            <v-card-actions>
                <v-btn flat @click="cancelDeleteItem()" color="orange">Annuler</v-btn>
                <v-btn flat @click="remmoveRestaurant()" color="orange">Poursuivre</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-data-table
        :headers="headers"
        :items="listOfRestaurants"
        class="elevation-1"
    >
        <template v-slot:items="props">
        <td class="text-xs-right">{{ props.item.resto.nom }}</td>
         <td class="text-xs-right">{{ props.item.resto.description }}</td>
        <td class="text-xs-right">{{ props.item.cuisine.nom }}</td> 
       <td class="text-xs-right"> 
           <v-btn slot="activator" @click="goToForm(props.item.resto)" flat icon color="rgba(0, 0, 0, 0.87)">
                <v-icon>edit</v-icon>
            </v-btn>
        </td>
        <td class="text-xs-right"> 
           <v-btn slot="activator" @click="deleteItem(props.item.resto)" flat icon color="rgba(0, 0, 0, 0.87)">
                <v-icon>delete</v-icon>
            </v-btn>
        </td>
       <!-- <td class="text-xs-right">

        <v-menu offset-y content-class="dropdown-menu" transition="slide-y-transition">
            <v-btn slot="activator" flat icon color="rgba(0, 0, 0, 0.87)">
                <v-icon>add</v-icon>
            </v-btn>
            <v-card>
                <v-card-actions>
                    <v-btn flat @click="openDialog()" color="orange">Log in</v-btn>
                    <v-btn flat @click="openDialog()" color="orange">S'inscrire</v-btn>
                </v-card-actions>
            </v-card>
        </v-menu>

       </td> -->
        </template>
        <template v-slot:pageText="props">
        Lignes {{ props.pageStart }} - {{ props.pageStop }} de {{ props.itemsLength }}
        </template>
    </v-data-table>
</div>
 
</template>

<script src="./list-restaurant-component.js"></script>
<style src="./list-restaurant-style.css"></style>
