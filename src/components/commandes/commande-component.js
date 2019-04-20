import Vue from 'vue'
import Component from 'vue-class-component';

import ListPlat from './list-plat/ListPlat.vue'
import ListOrder from './list-order/ListOrder.vue'
import RestaurantSlider from '../restaurants/resto-slider/RestaurantSlider.vue';
import LoginSubscribe from '../login-subscribe/LoginSubscribe.vue'
import RestaurantAutocomplete from "../restaurants/resto-autocomplete/RestaurantAutocomplete.vue";

import { db } from "../../Database";
require('firebase/auth');

var restaurantsRef = db.ref("restaurant");
var platRef = db.ref("plat");
var cuisineRef = db.ref("cuisine");

// @Component({})
export default {
    props: ["resto"],
    data() {
        return {
            restaurant: { id: "", nom: "", cuisine: "", photo: "", description: "" },
            restaurants: [],
            open: false,
            typehorsdOeuvre: "Hors d'oeuvre",
            typePlat: "Plat",
            typeDessert: "Dessert",
            orders: [
            ],
            horsdoeuvre: [],
            plats: [],
            desserts: [],
            pagination: {
                sortBy: 'name'
            },
            selected: [],
        }
    },
    methods: {
        openDialog() {
            this.open = true;
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
        // if (dbauth.auth().currentUser === undefined || dbauth.auth().currentUser === null) {
        //     this.$router.push({ path: `/login` });
        // }
        restaurantsRef.once("value", Response => {
            Response.forEach(item => {
                cuisineRef
                    .orderByKey()
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
            });
            console.log('this.restaurants:::' + this.restaurants.length);

            if (this.restaurants.length != 0) {
                let restoParam = (this.resto != undefined) ? this.resto : this.restaurants[0].id;
                console.log('restoParam:::' + restoParam);
                restaurantsRef
                    .orderByKey()
                    .equalTo(restoParam)
                    .on("child_added", snapshot => {
                        this.restaurant.id = snapshot.key;
                        this.restaurant.nom = snapshot.child("nom").val();
                        this.restaurant.photo = snapshot.child("photo").val();
                        this.restaurant.description = snapshot.child("description").val();
                    });

                platRef.orderByChild("restaurant")
                    .equalTo(this.restaurant.id)
                    .on("child_added", Response => {
                        if (Response.child("type").val() == this.typehorsdOeuvre) {
                            this.horsdoeuvre.push({
                                id: Response.key,
                                name: Response.child("nom").val(),
                                prix: Response.child("prix").val(),
                                image: Response.child("photo").val()

                            });
                        }
                        if (Response.child("type").val() == this.typePlat) {
                            this.plats.push({
                                id: Response.key,
                                name: Response.child("nom").val(),
                                prix: Response.child("prix").val(),
                                image: Response.child("photo").val()
                            });
                        }
                        if (Response.child("type").val() == this.typeDessert) {
                            this.desserts.push({
                                id: Response.key,
                                name: Response.child("nom").val(),
                                prix: Response.child("prix").val(),
                                image: Response.child("photo").val()
                            });
                        }
                    });
            }
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
        // restaurants: {
        //     get: function () {
        //         return this._restaurants;
        //     },
        //     set: function (newVal) {
        //         this._restaurants = newVal;
        //     }
        // }
    }
}
