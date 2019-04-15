<template>
   <v-container fluid grid-list-md>
       <v-layout row wrap>
            <v-flex md12>
                <h2>Nos restaurants</h2>
                <!-- <RestaurantSlider></RestaurantSlider> -->
            </v-flex>
       </v-layout>
       
        <h1>Notre Carte</h1>
        <v-layout row wrap>
            <v-flex xs4>
                <h2>Hors d'oeuvre</h2>
                <ListPlat v-bind:plats="horsdoeuvre" v-bind:type="typehorsdOeuvre" v-bind:output-data="orders"></ListPlat>
            </v-flex>
            <v-flex xs4>
                 <h2>Plat</h2>
                 <ListPlat v-bind:plats="plats" v-bind:type="typePlat" v-bind:output-data="orders"></ListPlat>
            </v-flex>
            <v-flex xs4>
                 <h2>Dessert</h2>
                 <ListPlat v-bind:plats="desserts" v-bind:type="typeDessert" v-bind:output-data="orders"></ListPlat>
            </v-flex>
            <v-flex xs12>
                <h2>Liste des commandes</h2>
                <ListOrder v-bind:orders="orders"></ListOrder>
            </v-flex>
        </v-layout>
   </v-container>
</template>

<script src="./commande-component.js"></script>
<style src="./commande-style.css"></style>
