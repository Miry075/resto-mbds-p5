import Vue from 'vue'
import Component from 'vue-class-component';
import { db } from "../../Firebase";
import VueSingleSelect from "vue-single-select";
Vue.component('vue-single-select', VueSingleSelect);

var restaurantsRef = db.ref("restaurant");

export default {
    props: ['resto'],

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
    computed: {
        selectedRestaurant: {
            get: function () {
                return this._restaurant;
            },
            set: function (newVal) {
                this._restaurant = newVal;
            }
        }
    }
        
}