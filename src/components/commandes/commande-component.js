import Vue from 'vue'
import Component from 'vue-class-component';

import ListPlat from './list-plat/ListPlat.vue'
import ListOrder from './list-order/ListOrder.vue'
import RestaurantSlider from '../restaurants/resto-slider/RestaurantSlider.vue';
import LoginSubscribe from '../login-subscribe/LoginSubscribe.vue'
import RestaurantAutocomplete from "../restaurants/resto-autocomplete/RestaurantAutocomplete.vue";
import VueSingleSelect from "vue-single-select";

import SpinnerLoader from "../spinner-loader/SpinnerLoader.vue";
// Import stylesheet

Vue.component('vue-single-select', VueSingleSelect);

import { db } from "../../Database";

import { mapState } from "vuex";

var restaurantsRef = db.ref("restaurant");
var cuisineRef = db.ref("cuisine");
var platRef = db.ref("plat");
var platTypeRef = db.ref("type");
var commandeRef = db.ref("commandes");

// @Component({})
export default {
    props: ["id"],
    data() {
        return {
            isLoading: true,
            fullPage: true,
            message: 'Loading ...',
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
        saveCommande() {
            this.message = "Saving ...";
            this.isLoading= true;
            this.orders.forEach(item => {
                item.user = sessionStorage.get("username");
                item.orderDqte = new Date();
                this.commandeRef.push(item);
            });
            debugger
            this.isLoading= false;
        },
        onCancel() {
            console.log('User cancelled the loader.')
        },
        openDialog() {
            this.open = true;
        },
        findPlatsByResto(restaurant) {
            var this_s = this;
            this.message = "Loading ...";
            this.isLoading = true;
            platRef.orderByChild("restaurant").equalTo(restaurant.key).once("value", response => {
                this.plats = [];
                this.horsdoeuvre = [];
                this.desserts = [];
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
                this.isLoading = false;
            });
        }
    },
    components: {
        ListPlat,
        ListOrder,
        RestaurantSlider,
        LoginSubscribe,
        RestaurantAutocomplete,
        SpinnerLoader
    },

    mounted() {
        var this_s = this;
        var fistRestaurant = null;
        var index = 0;

        if (this.id != null && this.id != 'id') {
            restaurantsRef
                .orderByKey()
                .equalTo(this.id)
                .on("child_added", item => {
                    cuisineRef.orderByKey()
                        .equalTo(item.child("cuisine").val())
                        .on("child_added", snapshot => {
                            let restaurant = {};
                            restaurant.key = item.key;
                            restaurant.nom = item.child("nom").val();
                            restaurant.cuisine = snapshot.child("nom").val();
                            restaurant.photo = item.child("photo").val();
                            restaurant.description = item.child("description").val();
                            this_s.selectedRestaurant = restaurant;
                            this_s.findPlatsByResto(restaurant);
                        });
                });
        }
        restaurantsRef.once("value", Response => {
            Response.forEach(item => {
                if (index == 0 && this._restaurant == undefined) {
                    this_s.selectedRestaurant = this_s.restaurants[0];
                    this_s.findPlatsByResto(item);
                }

                cuisineRef.orderByKey()
                    .equalTo(item.child("cuisine").val())
                    .on("child_added", snapshot => {
                        this.restaurants.push({
                            key: item.key,
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
            if (!auth) {
                this.$router.replace(this.nextRoute)
            }
        }
    },
    computed: {
        ...mapState(["user"]),
        selectedRestaurant: {
            get: function () {
                return this._restaurant;
            },
            set: function (newVal) {
                this._restaurant = newVal;
                if (newVal) {
                    if (newVal) {
                        this.findPlatsByResto(newVal);
                    }
                }
            }
        }
    }
}
