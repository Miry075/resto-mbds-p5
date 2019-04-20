<template>
    <v-data-table
        :headers="headers"
        :items="listOfRestaurants"
        class="elevation-1"
    >
        <template v-slot:items="props">
        <td class="text-xs-right">{{ props.item.resto.nom }}</td>
         <td class="text-xs-right">{{ props.item.resto.description }}</td>
        <td class="text-xs-right">{{ props.item.cuisine.nom }}</td> 
        <!-- <td class="text-xs-right"> <v-img v-bind:src="`${props.item.photo}`" aspect-ratio="2.75"></v-img></td> -->
       <td class="text-xs-right"> 
           <!-- <router-link to="/admin/restaurant-form/`${JSON.stringify(props.item)}`" >Liste des restaurants</router-link> -->
           <!-- <router-link to="`${props.item.link}`" >Edit</router-link> -->
           <v-btn slot="activator" @click="goToForm(props.item.resto)" flat icon color="rgba(0, 0, 0, 0.87)">
                <v-icon>edit</v-icon>
            </v-btn>
        </td>
       <td class="text-xs-right">

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

       </td>
        </template>
        <template v-slot:pageText="props">
        Lignes {{ props.pageStart }} - {{ props.pageStop }} de {{ props.itemsLength }}
        </template>
    </v-data-table>
</template>

<script src="./list-restaurant-component.js"></script>
<style src="./list-restaurant-style.css"></style>
