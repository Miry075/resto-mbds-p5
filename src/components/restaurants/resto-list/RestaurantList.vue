<template>
 <!-- <v-select :items="items" v-model="cuisine" label="Cuisine" clearable></v-select> -->
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs5>
        <v-text-field v-model="nom" label="Nom"></v-text-field>
      </v-flex>
      <v-flex xs5>
        <v-select :items="items" v-model="cuisine" label="Cuisine" clearable></v-select>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex v-for="(r,index) in filteredList" :key="index" xs4>
        <v-card style="cursor: pointer" @click="details(r.id)">
          <v-img :src="r.photo" aspect-ratio="1.7"></v-img>
          <v-card-title primary-title>
            <div>
              <h3>{{r.nom}}</h3>
              <div>{{r.cuisine}}</div>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script src="./restaurant-list-component.js"></script>
<style src="./restaurant-list-style.css"></style>
