import Vue from 'vue'
import Component from 'vue-class-component';

import { db } from "../../../Firebase";

var restaurantsRef = db.ref("restaurant");

export default {
    props: ['resto'],
    data(){
      return{
        _restaurant:{},
        restaurants: []
      }
    },
    mounted() {
        restaurantsRef.once("value", Response => {
            Response.forEach(item => {
                this.restaurants.push({
                    id: item.child("id").val(),
                    nom: item.child("nom").val(),
                    cuisine: item.child("cuisine").val()
                });
            });
        });
        console.log(' this.restaurants :::', this.restaurants)
    },
    computed: {
        selectedRestaurant: {
            get: function () {
                return this._restaurant;
            },
            set: function (newVal) {
                this._restaurant = newVal;
                console.log("newVal::::: ", this._restaurant);
            }
        }
    }
        
}