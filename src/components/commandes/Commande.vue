<template>
   <v-container fluid grid-list-md>
        <h1>Nos Restaurants</h1>
        <v-layout row wrap>
            <!-- <v-flex md4>
                <v-card>
                    <v-img
                    class="white--text"
                    height="200px"
                    src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                    >
                    <v-container fill-height fluid>
                        <v-layout fill-height>
                        <v-flex xs12 align-end flexbox>
                            <span class="headline">Top 10 Australian beaches</span>
                        </v-flex>
                        </v-layout>
                    </v-container>
                    </v-img>
                    <v-card-title>
                    <div>
                        <span class="grey--text">Number 10</span><br>
                        <span>Whitehaven Beach</span><br>
                        <span>Whitsunday Island, Whitsunday Islands</span>
                    </div>
                    </v-card-title>
                    <v-card-actions>
                    <v-btn flat color="orange">Share</v-btn>
                    <v-btn flat color="orange">Explore</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex> -->
            <v-flex md12>
                <!-- <h2>Nos restaurants</h2> -->
                <RestaurantSlider v-bind:restaurants="restaurants"></RestaurantSlider>
            </v-flex>
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
                <h2>Liste des commandes </h2>
                <ListOrder v-bind:orders="orders"></ListOrder>
            </v-flex>
        </v-layout>
   </v-container>
</template>

<script src="./commande-component.js"></script>
<style src="./commande-style.css"></style>
