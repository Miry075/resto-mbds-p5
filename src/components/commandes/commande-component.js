import Vue from 'vue'
import Component from 'vue-class-component';

import ListPlat from './list-plat/ListPlat.vue'
import ListOrder from './list-order/ListOrder.vue'
import RestaurantSlider from '../restaurants/resto-slider/RestaurantSlider.vue';
import LoginSubscribe from '../login-subscribe/LoginSubscribe.vue'
import RestaurantAutocomplete from "../restaurants/resto-autocomplete/RestaurantAutocomplete.vue";
import VueSingleSelect from "vue-single-select";
Vue.component('vue-single-select', VueSingleSelect);

import { db } from "../../Database";
require('firebase/auth');

var restaurantsRef = db.ref("restaurant");
var cuisineRef = db.ref("cuisine");
var platRef = db.ref("plat");
var platTypeRef = db.ref("type");

// @Component({})
export default {
    data() {
        return {
            _restaurant: {},
            restaurants: [],
            typePlats: [],
            open: false,
            typehorsdOeuvre: "Hors d'oeuvre",
            typePlat: "Plat",
            typeDessert: "Dessert",
            orders: [
            ],
            horsdoeuvre: [
                // { image: 'http://omnomlagos.com/wp-content/uploads/2015/07/Omnomlagos-Plantain-Prawn-and-Kale-Hors-doeuvres.jpg', name: 'Marc	Moreno', prix: '30' },
            ],
            plats: [
                // { image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3Eeeo5cR1iFLvK-IFMkux3f0MsbT-X9OgGe7KiWVI2DyXSyjTFw', name: 'Marc	Moreno', prix: '30' },
            ],
            desserts: [
                // { image: 'https://www.cookomix.com/wp-content/uploads/2017/04/glace-au-chocolat-thermomix-800x600.jpg', name: 'Marc	Moreno', prix: '30' },
            ],
            pagination: {
                sortBy: 'name'
            },
            selected: [],
        }
    },
    methods: {
        openDialog() {
            this.open = true;
        },
        findPlatsByResto(restaurant) {
            platRef.orderByChild("restaurant").equalTo(restaurant.key).once("value", response => {
                response.forEach(plat => {
                    var current = {
                        key: plat.key,
                        name: plat.child('nom').val(),
                        description: plat.child('description').val(),
                        image: plat.child('photo').val(),
                        prix: plat.child('prix').val(),
                        type: plat.child('type').val()
                    }
                    if (current.type == this.typePlat) {
                        this.plats.push(current);
                    }
                    if (current.type == this.typehorsdOeuvre) {
                        this.horsdoeuvre.push(current);
                    }
                    if (current.type == this.typeDessert) {
                        this.desserts.push(current);
                    }
                });
            });
        }
    },
    components: {
        ListPlat,
        ListOrder,
        RestaurantSlider,
        LoginSubscribe,
        RestaurantAutocomplete
    },

    mounted() {
        var this_s = this;
        var fistRestaurant = null;
        var index = 0;
        restaurantsRef.once("value", Response => {
            Response.forEach(item => {
                if (index == 0) {
                    this_s.selectedRestaurant = this_s.restaurants[0];
                    this_s.findPlatsByResto(item);
                }
                
                cuisineRef.orderByKey()
                    .equalTo(item.child("cuisine").val())
                    .on("child_added", snapshot => {
                        this.restaurants.push({
                            id: item.key,
                            nom: item.child("nom").val(),
                            cuisine: snapshot.child("nom").val(),
                            photo: item.child("photo").val(),
                            description: item.child("description").val()
                        });
                    });
            })
                index++;
        });
    },
    watch: {
        user(auth) {
            if (!!auth) {
                this.$router.replace(this.nextRoute)
            }
        }
    },
    computed: {
        selectedRestaurant: {
            get: function () {
                return this._restaurant;
            },
            set: function (newVal) {
                this._restaurant = newVal;
                if(newVal){
                    this.findPlatsByResto(newVal);
                }
            }
        }
    }
}
