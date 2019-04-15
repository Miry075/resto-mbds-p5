<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
        <h1>Restaurants</h1>
      </v-flex>
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

<script>
import { db } from "../Firebase";

var restaurantsRef = db.ref("restaurant");
var cuisinesRef = db.ref("cuisine");
var platsRef = db.ref("plat");
var menuRef = db.ref("menu");

export default {
  name: "restaurants",
  data() {
    return {
      restaurants: [],
      nom: "",
      cuisine: "",
      items: []
    };
  },
  mounted() {
  /*  menuRef.push({
      id: "menu_4",
      nom: "Menu pour trois",
      prix: "475",
      photo: "mugg-and-bean.jpg",
      plats: [
        "-Lc1lxbjgAzdH1Caf0Ei",
        "-Lc1lxbq8VzCLrVTjXCj",
        "-Lc1lxbsPLKXMxkqL1EV"
      ]
    }); 
    platsRef.push({
      nom: "Pétoncle sur chorizo",
    type:"Hors d'oeuvres",
    description:"Trois étages : une rondelle de chorizo qu’on fait dorer dans une poêle, un pétoncle qu’on fait cuire dans la même poêle et une touche de yogourt parfumé au citron et au wasabi.",
    prix:"200",
    photo:"saucisse-chorizo-petoncles-yogourt-ciboulette.jpg"
    });
    platsRef.push({
      nom: "Canapés au foie gras",
    type:"Hors d'oeuvres",
    description:"Ces bouchées sont composées de poitrines de poulet marinées coupées en cubes et enroulées de bacon.",
    prix:"300",
    photo:"pain-foie-gras-abricot-fines-herbes.jpeg"
    });
     platsRef.push({
      nom: "Travers de porc",
    type:"Plat",
    description:"Travers de porc",
    prix:"230",
    photo:"360px-Ribs_from_the_pit.jpg"
    });*/

    restaurantsRef.once("value", restaurants => {
      restaurants.forEach(restaurant => {
        cuisinesRef
          .orderByKey()
          .equalTo(restaurant.child("cuisine").val())
          .on("child_added", snapshot => {
            this.restaurants.push({
              id: restaurant.child("id").val(),
              nom: restaurant.child("nom").val(),
              cuisine: snapshot.child("nom").val(),
              photo: '',//require("../assets/restaurants/" +restaurant.child("photo").val()), comment aloa fa tsy hita aty amna io sary io fa averina refa miona tsika
              description:
                "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages."
            });
          });
      });
    });
    cuisinesRef.once("value", cuisines => {
      cuisines.forEach(cuisine => {
        this.items.push(cuisine.child("nom").val());
      });
    });
  },
  computed: {
    filteredList() {
      return this.restaurants.filter(restaurant => {
        if (this.cuisine != undefined) {
          return (
            restaurant.nom.toLowerCase().includes(this.nom.toLowerCase()) &&
            restaurant.cuisine
              .toLowerCase()
              .includes(this.cuisine.toLowerCase())
          );
        }
        return restaurant.nom.toLowerCase().includes(this.nom.toLowerCase());
      });
    }
  },
  methods: {
    details: function(id) {
      this.$router.push({ path: `/restaurant/${id}` });
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

