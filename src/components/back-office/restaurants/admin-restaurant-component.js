import Vue from 'vue'
import Component from 'vue-class-component';
import { db } from "../../../Database";
// import VueSingleSelect from "vue-single-select";
import VueSingleSelect from "vue-single-select";
import ListRestaurants from './list-restaurants/ListRestaurants.vue';
import VueRouter from 'vue-router'
Vue.use(VueRouter);
// Vue.component('vue-single-select', VueSingleSelect);

var restaurantsRef = db.ref("restaurant");
var cuisinesRef = db.ref("cuisine");

export default {
    props: ['resto'],
    components: {
        ListRestaurants,
        // VueSingleSelect
    },
    data() {
        return {
            cuisines:[],
            restaurants: [],
            headers: [
                {
                    text: 'Dessert (100g serving)',
                    align: 'left',
                    sortable: false,
                    value: 'name'
                },
                { text: 'Calories', value: 'calories' },
                { text: 'Fat (g)', value: 'fat' },
                { text: 'Carbs (g)', value: 'carbs' },
                { text: 'Protein (g)', value: 'protein' },
                { text: 'Iron (%)', value: 'iron' }
            ],
        }
    },
    mounted() {
        cuisinesRef.once("value", cuiz => {
            cuiz.forEach(item => {
                this.cuisines.push({
                    key:item.key,
                    nom:item.nom,
                    description:item.description
                })
            });
        });
        restaurantsRef.once("value", restaurants => {
            restaurants.forEach(restaurant => {
                if(restaurant.child("cuisine").val()){
                    cuisinesRef.orderByKey().equalTo(restaurant.child("cuisine").val()).on("child_added", cuisine => {
                        this.restaurants.push({
                            key: restaurant.key,
                            id: restaurant.child("id").val(),
                            nom: restaurant.child("nom").val(),
                            cuisine: {
                                key:cuisine.key,
                                nom: cuisine.child("nom").val()
                            },
                            adresse:restaurant.child("adresse").val(),
                            image:restaurant.child("image").val(),
                            description: restaurant.child("description").val()
                        });
                    })
                }else{
                    this.restaurants.push({
                        key: restaurant.key,
                        id: restaurant.child("id").val(),
                        nom: restaurant.child("nom").val(),
                        cuisine: {
                            key:'',
                            nom: ''
                        },
                        adresse:restaurant.child("adresse").val(),
                        image:restaurant.child("image").val(),
                        description: restaurant.child("description").val()
                    });
                }
                
            });
        });
    },
    methods:{
        goToForm:function(){
            this.$router.push('/admin/restaurant-form/'+JSON.stringify({}));
        }
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