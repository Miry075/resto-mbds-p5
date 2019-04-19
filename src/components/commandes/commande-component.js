import Vue from 'vue'
import Component from 'vue-class-component';

import ListPlat from './list-plat/ListPlat.vue'
import ListOrder from './list-order/ListOrder.vue'
import RestaurantSlider from '../restaurants/resto-slider/RestaurantSlider.vue';
import LoginSubscribe from '../login-subscribe/LoginSubscribe.vue'
import RestaurantAutocomplete from "../restaurants/resto-autocomplete/RestaurantAutocomplete.vue";

import { db } from "../../Firebase";

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
                            photo: item.child("photo").val()
                        });
                    });
            });
            if (this.restaurants.length != 0) {
                let restoParam = (this.resto != undefined) ? this.resto : this.restaurants[0].id;
                restaurantsRef
                    .orderByKey()
                    .equalTo(restoParam)
                    .on("child_added", snapshot => {
                        this.restaurant.id = snapshot.key;
                        this.restaurant.nom = snapshot.child("nom").val();
                        this.restaurant.photo = snapshot.child("photo").val();
                        this.restaurant.description =
                            "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages.";
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
