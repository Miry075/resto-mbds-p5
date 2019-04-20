import Vue from 'vue'
import Component from 'vue-class-component';
import RestaurantCard from './resto-card/RestaurantCard.vue'
import RestaurantMap  from "./resto-map/RestaurantMap.vue";
import RestaurantList  from "./resto-list/RestaurantList.vue";
import { db } from "../../Database";

var restaurantsRef = db.ref("restaurant");

export default {
    components: {
        RestaurantCard,
        RestaurantMap,
        RestaurantList
    },

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
}