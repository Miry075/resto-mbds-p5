<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
        <h1>Restaurants</h1>
      </v-flex>
      <v-flex xs5>
        <v-text-field v-model="nom" label="Nom" required></v-text-field>
      </v-flex>
      <v-flex xs5>
        <v-select :items="items" label="Cuisine"></v-select>
      </v-flex>
      <v-flex xs2>
        <v-btn color="primary">
          <v-icon>search</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex v-for="r in restaurants" xs4>
        <v-card style="cursor: pointer" @click="details(r.id)">
          <v-img :src="require('../assets/mugg-and-bean.jpg')" aspect-ratio="1.7"></v-img>
          <v-card-title primary-title>
            <div>
              <h3>{{r.nom}}</h3>
              <div>{{r.cuisine}}</div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn @click="details(r.id)" flat color="orange">Details</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { db } from "../Firebase";

var restaurantsRef = db.ref("restaurant");

export default {
  name: "restaurants",
  data() {
    return {
      restaurants: [],
      nom: "",
      items: ["Chinoise", "Creole", "Americaine", "Francaise"]
    };
  },
  mounted() {
    restaurantsRef.once("value", restaurants => {
      restaurants.forEach(restaurant => {
        this.restaurants.push({
          id: restaurant.child("id").val(),
          nom: restaurant.child("nom").val(),
          cuisine: restaurant.child("cuisine").val()
        });
      });
    });
  },
  methods: {
    details: function(id) {
      this.$router.push({ path: `/restaurant/${id}` });
    },
    test: function() {
      alert("test");
    }
    /*supprimerRestaurant: function(r) {
      console.log(r[".key"]);
      restaurantsRef.child(r[".key"]).remove();
    },

    ajouterRestaurant: function() {
      let nouveauRestaurant = {
        nom: this.nom,
        cuisine: this.cuisine
        //    id: _.uniqueId("restaurant_")
      };

      restaurantsRef.push(nouveauRestaurant);
      this.restaurants.push({ nom: this.nom, cuisine: this.cuisine });

      this.nom = "";
      this.cuisine = "";
    }*/
  }
};
</script>