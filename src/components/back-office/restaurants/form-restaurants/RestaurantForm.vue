<template>
  <v-container grid-list-md id="restaurant-form">
      <h1>Ajouter un restaurant</h1>
        <v-layout row wrap>
            <v-flex md4>
                <!-- <router-link to="/admin/restaurants">Liste des restaurants</router-link> -->
                <v-btn flat @click="goToList()" color="orange"> <v-icon>list</v-icon> Liste des restaurants</v-btn>
            </v-flex> 
        </v-layout>
        <v-layout wrap>
            <v-flex xs12 sm6 md6>
                <v-text-field label="Nom*" v-model="restaurantToSave.nom" required></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md6>
                <v-text-field
                    label="Description"
                    v-model="restaurantToSave.description"
                    persistent-hint
                    required
                ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md6>
                <v-text-field label="Telephone" v-model="restaurantToSave.num" required></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md6>
                <v-text-field
                    label="Adresse"
                    v-model="restaurantToSave.adresse"
                    persistent-hint
                    required
                ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6>
                <v-select
                v-model="restaurantToSave.cuisine"
                :items="cuisines"
                label="Cuisine"
                item-text="nom"
                ></v-select>
            </v-flex>
            <v-flex md12 class="text-xs-center text-sm-center text-md-center text-lg-center">
                <v-flex md6>
                    <v-text-field label="Select Image" @click='pickFile' v-model='imageName' prepend-icon='attach_file'></v-text-field>
                        <input
                        type="file"
                        style="display: none"
                        ref="image"
                        accept="image/*"
                        @change="onFilePicked"
                        >
                </v-flex>
                <v-flex md6>
                    <img :src="imageUrl" height="150" v-if="imageUrl"/>
                </v-flex>
                
			</v-flex>
        </v-layout>
        <v-layout>
             <v-flex xs12>
                <v-btn color="blue darken-1" flat @click="saveRestaurant()">Sauvegarder</v-btn>
             </v-flex>
        </v-layout>

    </v-container>
</template>

<script src="./restaurant-form-component.js"></script>
<style src="./restaurant-form-style.css"></style>
