import Vue from 'vue'
import Component from 'vue-class-component';

import ListPlat from './list-plat/ListPlat.vue'
import ListOrder from './list-order/ListOrder.vue'
import RestaurantSlider from '../restaurants/resto-slider/RestaurantSlider.vue';
import LoginSubscribe from '../login-subscribe/LoginSubscribe.vue'
import RestaurantAutocomplete from "../restaurants/resto-autocomplete/RestaurantAutocomplete.vue";

import { db } from "../../Firebase";

var restaurantsRef = db.ref("restaurant");

// @Component({})
export default {
    data() {
        return { 
            restaurants:[],
            open:false,
            typehorsdOeuvre:"Hors d'oeuvre",
            typePlat:"Plat",
            typeDessert:"Dessert",
            orders: [
            ],    
            horsdoeuvre: [
                { image: 'http://omnomlagos.com/wp-content/uploads/2015/07/Omnomlagos-Plantain-Prawn-and-Kale-Hors-doeuvres.jpg', name: 'Marc	Moreno', prix: '30' },
                { image: 'http://omnomlagos.com/wp-content/uploads/2015/07/Omnomlagos-Plantain-Prawn-and-Kale-Hors-doeuvres.jpg', name: 'Wallace	Frank', prix: '31' },
                { image: 'http://omnomlagos.com/wp-content/uploads/2015/07/Omnomlagos-Plantain-Prawn-and-Kale-Hors-doeuvres.jpg', name: 'Enrique	Sanders', prix: '45' },
                { image: 'http://omnomlagos.com/wp-content/uploads/2015/07/Omnomlagos-Plantain-Prawn-and-Kale-Hors-doeuvres.jpg', name: 'Alyssa	Butler', prix: '23' },
                { image: 'http://omnomlagos.com/wp-content/uploads/2015/07/Omnomlagos-Plantain-Prawn-and-Kale-Hors-doeuvres.jpg', name: 'Domingo	Gill', prix: '29' },
                { image: 'http://omnomlagos.com/wp-content/uploads/2015/07/Omnomlagos-Plantain-Prawn-and-Kale-Hors-doeuvres.jpg', name: 'Felix	May', prix: '28' },
                { image: 'http://omnomlagos.com/wp-content/uploads/2015/07/Omnomlagos-Plantain-Prawn-and-Kale-Hors-doeuvres.jpg', name: 'Bradford	Powell', prix: '15' },
                { image: 'http://omnomlagos.com/wp-content/uploads/2015/07/Omnomlagos-Plantain-Prawn-and-Kale-Hors-doeuvres.jpg', name: 'Hattie	Coleman', prix: '17' },
                { image: 'http://omnomlagos.com/wp-content/uploads/2015/07/Omnomlagos-Plantain-Prawn-and-Kale-Hors-doeuvres.jpg', name: 'Marty	Jordan', prix: '23' },
                { image: 'http://omnomlagos.com/wp-content/uploads/2015/07/Omnomlagos-Plantain-Prawn-and-Kale-Hors-doeuvres.jpg', name: 'Bobbie	Webb', prix: '28' }
            ],
            plats: [
                { image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3Eeeo5cR1iFLvK-IFMkux3f0MsbT-X9OgGe7KiWVI2DyXSyjTFw', name: 'Marc	Moreno', prix: '30' },
                { image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3Eeeo5cR1iFLvK-IFMkux3f0MsbT-X9OgGe7KiWVI2DyXSyjTFw', name: 'Wallace	Frank', prix: '31' },
                { image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3Eeeo5cR1iFLvK-IFMkux3f0MsbT-X9OgGe7KiWVI2DyXSyjTFw', name: 'Enrique	Sanders', prix: '45' },
                { image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3Eeeo5cR1iFLvK-IFMkux3f0MsbT-X9OgGe7KiWVI2DyXSyjTFw', name: 'Alyssa	Butler', prix: '23' },
                { image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3Eeeo5cR1iFLvK-IFMkux3f0MsbT-X9OgGe7KiWVI2DyXSyjTFw', name: 'Domingo	Gill', prix: '29' },
                { image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3Eeeo5cR1iFLvK-IFMkux3f0MsbT-X9OgGe7KiWVI2DyXSyjTFw', name: 'Felix	May', prix: '28' },
                { image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3Eeeo5cR1iFLvK-IFMkux3f0MsbT-X9OgGe7KiWVI2DyXSyjTFw', name: 'Bradford	Powell', prix: '15' },
                { image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3Eeeo5cR1iFLvK-IFMkux3f0MsbT-X9OgGe7KiWVI2DyXSyjTFw', name: 'Hattie	Coleman', prix: '17' },
                { image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3Eeeo5cR1iFLvK-IFMkux3f0MsbT-X9OgGe7KiWVI2DyXSyjTFw', name: 'Marty	Jordan', prix: '23' },
                { image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3Eeeo5cR1iFLvK-IFMkux3f0MsbT-X9OgGe7KiWVI2DyXSyjTFw', name: 'Bobbie	Webb', prix: '28' }
            ],
            desserts: [
                { image: 'https://www.cookomix.com/wp-content/uploads/2017/04/glace-au-chocolat-thermomix-800x600.jpg', name: 'Marc	Moreno', prix: '30' },
                { image: 'https://www.cookomix.com/wp-content/uploads/2017/04/glace-au-chocolat-thermomix-800x600.jpg', name: 'Wallace	Frank', prix: '31' },
                { image: 'https://www.cookomix.com/wp-content/uploads/2017/04/glace-au-chocolat-thermomix-800x600.jpg', name: 'Enrique	Sanders', prix: '45' },
                { image: 'https://www.cookomix.com/wp-content/uploads/2017/04/glace-au-chocolat-thermomix-800x600.jpg', name: 'Alyssa	Butler', prix: '23' },
                { image: 'https://www.cookomix.com/wp-content/uploads/2017/04/glace-au-chocolat-thermomix-800x600.jpg', name: 'Domingo	Gill', prix: '29' },
                { image: 'https://www.cookomix.com/wp-content/uploads/2017/04/glace-au-chocolat-thermomix-800x600.jpg', name: 'Felix	May', prix: '28' },
                { image: 'https://www.cookomix.com/wp-content/uploads/2017/04/glace-au-chocolat-thermomix-800x600.jpg', name: 'Bradford	Powell', prix: '15' },
                { image: 'https://www.cookomix.com/wp-content/uploads/2017/04/glace-au-chocolat-thermomix-800x600.jpg', name: 'Hattie	Coleman', prix: '17' },
                { image: 'https://www.cookomix.com/wp-content/uploads/2017/04/glace-au-chocolat-thermomix-800x600.jpg', name: 'Marty	Jordan', prix: '23' },
                { image: 'https://www.cookomix.com/wp-content/uploads/2017/04/glace-au-chocolat-thermomix-800x600.jpg', name: 'Bobbie	Webb', prix: '28' }
            ],
            pagination: {
                sortBy: 'name'
            },
            selected: [],

        }
    },
    methods:{
        openDialog(){
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
            this.restaurants.push({
                    id: item.child("id").val(),
                    nom: item.child("nom").val(),
                    cuisine: item.child("cuisine").val()
                });
            });
        });

        console.log(' this.restaurants :::', this.restaurants)
    }
}
