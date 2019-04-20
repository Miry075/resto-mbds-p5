<template>
    <v-container grid-list-md id="restaurant-form">
        <h1>Restaurants</h1>
        <v-layout row wrap>
            <v-flex md4>
                <v-btn flat @click="goToForm()" color="orange"> <v-icon>add</v-icon> Nouveau Restaurant</v-btn>
            </v-flex> 
        </v-layout>
        <ListRestaurants v-bind:restaurants="restaurants" v-bind:cuisines="cuisines"></ListRestaurants>
    </v-container>
</template>

<script src="./admin-restaurant-component.js"></script>
<style src="./admin-restaurant-style.css"></style>
