
<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs5>
        <h1>{{restaurant.nom}}</h1>
        <span class="grey--text">Cuisine {{restaurant.cuisine}}</span>
        <p>{{restaurant.description}}</p>
      </v-flex>
      <v-flex xs7>
        <v-img :src="restaurant.photo" aspect-ratio="1.8"></v-img>
      </v-flex>
    </v-layout>

    <v-layout row wrap class="mt-5">
      <v-flex xs12>
        <h1>Menus</h1>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex v-for="(menu,index) in menus" :key="index" xs4>
        <v-card style="cursor: pointer" @click="details(menu.id)">
          <v-img :src="menu.photo" aspect-ratio="1.7"></v-img>
          <v-card-title primary-title>
            <div>
              <h3>{{menu.nom}}</h3>
              <div>Rs {{menu.prix}}</div>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout row wrap class="mt-5">
      <v-flex xs12>
        <h1>Carte</h1>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs4>
        <v-text-field label="Nom" v-model="nom"></v-text-field>
      </v-flex>
      <v-flex xs4>
        <v-select :items="items" label="Type" v-model="type" clearable></v-select>
      </v-flex>
      <v-flex xs4>
        <v-layout row wrap>
          <v-flex xs8>
            <v-range-slider label="Prix" v-model="price" :max="3000" :min="50" :step="10"></v-range-slider>
          </v-flex>
          <v-flex xs2>
            <v-text-field v-model="price[0]" class="mt-0" hide-details single-line type="number"></v-text-field>
          </v-flex>
          <v-flex xs2>
            <v-text-field v-model="price[1]" class="mt-0" hide-details single-line type="number"></v-text-field>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex v-for="(plat,index) in filteredList" :key="index" xs4>
        <v-card>
          <v-img :src="plat.photo" aspect-ratio="1.7"></v-img>
          <v-card-title primary-title>
            <div>
              <h3>{{plat.nom}}</h3>
              <span class="grey--text">{{plat.type}}</span>
              <br>
              <div>Rs {{plat.prix}}</div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="orange">Commander</v-btn>
            <v-btn flat @click="openDialog(index)" color="orange">Details</v-btn>
          </v-card-actions>
        </v-card>
        <v-dialog v-model="dialog" max-width="290">
          <v-card>
            <v-card-title class="headline">{{platDialog.nom}}</v-card-title>

            <v-card-text>{{platDialog.description}}</v-card-text>
            <div>Rs {{platDialog.prix}}</div>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="orange darken-1" flat="flat" @click="dialog = false">Commander</v-btn>
              <v-btn color="orange darken-1" flat="flat" @click="dialog = false">Fermer</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { db } from "../Firebase";

var restaurantsRef = db.ref("restaurant");
var cuisinesRef = db.ref("cuisine");
var menuRef = db.ref("menu");
var platRef = db.ref("plat");

export default {
  name: "restaurant",
  props: ["id"],

  data() {
    return {
      restaurant: { nom: "", cuisine: "", photo: "", description: "" },
      menus: [],
      plats: [],
      price: [50, 1000],
      nom: "",
      type: "",
      items: ["Hors d'oeuvres", "Plat", "Dessert"],
      dialog: false,
      platDialog: ""
    };
  },

  mounted() {
    restaurantsRef
      .orderByChild("id")
      .equalTo(this.id)
      .on("child_added", snapshot => {
        this.restaurant.nom = snapshot.child("nom").val();
        this.restaurant.photo = '';//require("../assets/restaurants/" + snapshot.child("photo").val());
        this.restaurant.description =
          "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages.";

        cuisinesRef
          .orderByKey()
          .equalTo(snapshot.child("cuisine").val())
          .on("child_added", snapshot2 => {
            this.restaurant.cuisine = snapshot2.child("nom").val();
          });

        menuRef
          .orderByChild("restaurant")
          .equalTo(snapshot.key)
          .on("child_added", snapshot => {
            this.menus.push({
              id: snapshot.child("id").val(),
              nom: snapshot.child("nom").val(),
              prix: snapshot.child("prix").val(),
              photo: ''//require("../assets/menu/" + snapshot.child("photo").val())
            });
          });

        platRef
          .orderByChild("restaurant")
          .equalTo(snapshot.key)
          .on("child_added", snapshot => {
            this.plats.push({
              nom: snapshot.child("nom").val(),
              prix: snapshot.child("prix").val(),
              type: snapshot.child("type").val(),
              description: snapshot.child("description").val(),
              photo: ''//require("../images/plats/" + snapshot.child("photo").val())
            });
          });
      });
  },
  computed: {
    filteredList() {
      return this.plats.filter(plat => {
        if (this.type != undefined) {
          return (
            plat.nom.toLowerCase().includes(this.nom.toLowerCase()) &&
            plat.type.toLowerCase().includes(this.type.toLowerCase()) &&
            plat.prix >= this.price[0] &&
            plat.prix <= this.price[1]
          );
        }
        return (
          plat.nom.toLowerCase().includes(this.nom.toLowerCase()) &&
          plat.prix >= this.price[0] &&
          plat.prix <= this.price[1]
        );
      });
    }
  },
  methods: {
    openDialog(index) {
      this.dialog = true;
      this.platDialog = this.plats[index];
      console.log(this.plats[index].nom);
    },
    details: function(id) {
      this.$router.push({ path: `/menu/${id}` });
    }
  }
};
</script>