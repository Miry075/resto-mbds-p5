<template>
  <v-container grid-list-md id="restaurant-form">
      <h1>Ajouter un Plat</h1>
      <v-layout row wrap>
             <v-flex md4>
                <!-- <h2>Nos restaurants</h2> -->
                <!-- <RestaurantSlider v-bind:restaurants="restaurants"></RestaurantSlider> -->
                <vue-single-select
                    v-model="selectedRestaurant"
                    :options="restaurants"
                    option-label="nom"
                    :required="true"
                ></vue-single-select>
            </v-flex>
        </v-layout>
        <v-layout wrap>
            <v-flex xs12 sm6 md6>
                <v-text-field label="Legal first name*" required></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md6>
                <v-text-field
                    label="Legal last name*"
                    hint="example of persistent helper text"
                    persistent-hint
                    required
                ></v-text-field>
            </v-flex>
            <v-flex xs12>
                <v-text-field label="Email*" required></v-text-field>
            </v-flex>
            <v-flex xs12>
                <v-text-field label="Password*" type="password" required></v-text-field>
            </v-flex>
            <v-flex xs12 sm6>
            <v-select
                :items="['0-17', '18-29', '30-54', '54+']"
                label="Age*"
                required
            ></v-select>
            </v-flex>
            <v-flex xs12 sm6>
            <v-autocomplete
                :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                label="Interests"
                multiple
            ></v-autocomplete>
            </v-flex>
        </v-layout>
        <v-layout>
             <v-flex xs12>
                <v-btn color="blue darken-1" flat @click="dialog = false">Sauvegarder</v-btn>
             </v-flex>
        </v-layout>

    </v-container>
</template>

<script src="./restaurant-form-component.js"></script>
<style src="./restaurant-form-style.css"></style>
