
<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
        <h1>{{restaurant.nom}}</h1>
        <span class="grey--text">Cuisine {{restaurant.cuisine}}</span>
        <p>Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages.</p>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="ma-2">
      <v-flex xs12>
        <h2>Carte</h2>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs4>
        <v-card style="cursor: pointer">
          <v-img :src="require('../assets/hors-d-oeuvres.jpg')" aspect-ratio="1.7"></v-img>
          <v-card-title primary-title>
            <div>
              <h3>Hors d'oeuvres</h3>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
      <v-flex xs4>
        <v-card style="cursor: pointer">
          <v-img :src="require('../assets/plats.jpg')" aspect-ratio="1.7"></v-img>
          <v-card-title primary-title>
            <div>
              <h3>Plats</h3>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
      <v-flex xs4>
        <v-card style="cursor: pointer">
          <v-img :src="require('../assets/dessert.jpg')" aspect-ratio="1.7"></v-img>
          <v-card-title primary-title>
            <div>
              <h3>Desserts</h3>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout row wrap class="ma-2">
      <v-flex xs12>
        <h2>Menus</h2>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex v-for="i in 3" :key="`6${i}`" xs4>
        <v-card style="cursor: pointer">
          <v-img :src="require('../assets/mugg-and-bean.jpg')" aspect-ratio="1.7"></v-img>
          <v-card-title primary-title>
            <div>
              <h3>Menu surprise</h3>
              <div>Rs 650</div>
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

export default {
  name: "restaurant",
  props: ["id"],
  data() {
    return {
      restaurant: { nom: "", cuisine: "" }
    };
  },
  mounted() {
    restaurantsRef
      .orderByChild("id")
      .equalTo(this.id)
      .on("child_added", snapshot => {
        this.restaurant.nom = snapshot.child("nom").val();
        this.restaurant.cuisine = snapshot.child("cuisine").val();
      });
  }
};
</script>