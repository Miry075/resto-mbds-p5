<template>
   <v-container fluid grid-list-md>
        <h1>Carte et Menu</h1>
        <SpinnerLoader v-bind:isLoading="isLoading" v-bind:message="message"></SpinnerLoader>
        <v-layout row wrap>
             <v-flex md4>
                <!-- <h2>Nos restaurants</h2> -->
                <!-- <RestaurantSlider v-bind:restaurants="restaurants"></RestaurantSlider> -->
                <label>Restaurants</label>
                <vue-single-select
                    placeholder="Choisir un restaurant"
                    v-model="selectedRestaurant"
                    :options="restaurants"
                    option-label="nom"
                    :required="true"
                >
                    <template slot="option" slot-scope="{option, idx}">
                        <div>
                            <span><p>Restaurant: <b>{{option.nom}}</b> cuisine: {{option.cuisine}}</p></span>
                        </div>
                    </template>
                </vue-single-select>
            </v-flex>
        </v-layout>
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
             <!-- <v-flex xs3>
                 <h2>Menu</h2>
                 <ListPlat v-bind:plats="desserts" v-bind:type="typeDessert" v-bind:output-data="orders"></ListPlat>
            </v-flex> -->
            <v-flex xs12>
                <h2>Liste des commandes </h2>
                <ListOrder v-bind:orders="orders"></ListOrder>
            </v-flex>
        </v-layout>
        <template v-slot:placeholder>
                    <v-layout
                      fill-height
                      align-center
                      justify-center
                      ma-0
                    >
                      <v-progress-circular :indeterminate="true" color="grey lighten-5"></v-progress-circular>
                    </v-layout>
        </template>
 
   </v-container>
</template>

<script src="./commande-component.js"></script>
<style src="./commande-style.css"></style>
