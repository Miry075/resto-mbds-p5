import Vue from 'vue'
import Component from 'vue-class-component';
import RestaurantCard from './resto-card/RestaurantCard.vue'
import RestaurantMap  from "./resto-map/RestaurantMap.vue";
import RestaurantList  from "./resto-list/RestaurantList.vue";
import { db } from "../../Database";

import SpinnerLoader from "../spinner-loader/SpinnerLoader.vue";

var restaurantsRef = db.ref("restaurant");

export default {
    components: {
        RestaurantCard,
        RestaurantMap,
        RestaurantList,
        SpinnerLoader
    },

    data() {
        return {
            isOpen:false,
            message:'Loading ...',
            restaurants: [],
            nom: "",
            items: ["Chinoise", "Creole", "Americaine", "Francaise"]
        };
    },
    mounted() {
        this.isOpen = true;
        restaurantsRef.once("value", restaurants => {
            restaurants.forEach(restaurant => {
                this.restaurants.push({
                    id: restaurant.child("id").val(),
                    nom: restaurant.child("nom").val(),
                    cuisine: restaurant.child("cuisine").val()
                });
            });
            this.isOpen = false;
        });
    },
}