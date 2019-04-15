<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs7>
        <h1>{{menu.nom}}</h1>
        <span class="grey--text">Rs {{menu.prix}}</span>
        <v-data-table
          v-model="selected"
          :headers="headers"
          :items="menu.plats"
          :pagination.sync="pagination"
          select-all
          item-key="nom"
          class="elevation-1"
        >
          <template v-slot:headers="props">
            <tr>
              <th>
                <v-checkbox
                  :input-value="props.all"
                  :indeterminate="props.indeterminate"
                  primary
                  hide-details
                  @click.stop="toggleAll"
                ></v-checkbox>
              </th>
              <th v-for="header in props.headers" :key="header.text">{{ header.text }}</th>
            </tr>
          </template>
          <template v-slot:items="props">
            <tr :active="props.selected" @click="props.selected = !props.selected">
              <td>
                <v-checkbox :input-value="props.selected" primary hide-details></v-checkbox>
              </td>
              
              <td>{{ props.item.type }}</td>
              <td>{{ props.item.nom }}</td>
            </tr>
          </template>
        </v-data-table>
        <v-btn @click="test()">Commander</v-btn>
      </v-flex>
      <v-flex xs5>
        <v-img :src="menu.photo" aspect-ratio="1.8"></v-img>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { db } from "../Firebase";

var menuRef = db.ref("menu");
var platRef = db.ref("plat");

export default {
  name: "detailMenu",
  props: ["id"],
  data() {
    return {
      menu: { nom: "", prix: "", photo: "", plats: [] },
      pagination: {
        sortBy: "name"
      },
      selected: [],
      headers: [{ text: "Type" }, { text: "Nom plat" }]
    };
  },
  mounted() {
    menuRef
      .orderByChild("id")
      .equalTo(this.id)
      .on("child_added", snapshot => {
        this.menu.nom = snapshot.child("nom").val();
        this.menu.prix = snapshot.child("prix").val();
        this.menu.photo = ''//require("../assets/menu/" + napshot.child("photo").val());
        /* let platsKeys = snapshot.child("plats").val();
        console.log(platsKeys);
         for (let index = 0; index < platsKeys.length; index++) {
          const element = array[index];
          console.log(element);
        }*/
        snapshot
          .child("plats")
          .val()
          .forEach(plat => {
            console.log(plat);
            platRef
              .orderByKey()
              .equalTo(plat)
              .on("child_added", snapshot => {
                this.menu.plats.push({
                  nom: snapshot.child("nom").val(),
                  prix: snapshot.child("prix").val(),
                  type: snapshot.child("type").val()
                });
              });
          });
      });
  },
  methods: {
    toggleAll() {
      if (this.selected.length) {
        this.selected = [];
      } else {
        this.selected = this.menu.plats.slice();
      }
    },
    test() {
      console.log(this.selected);
    }
  }
};
</script>

<style>
</style>
