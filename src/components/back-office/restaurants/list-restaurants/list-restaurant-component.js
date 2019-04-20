import Vue from 'vue'
import Component from 'vue-class-component';
import { db } from "../../../../Database";

import SpinnerLoader from "../../../spinner-loader/SpinnerLoader.vue";
// import VueSingleSelect from "vue-single-select";
import VueSingleSelect from "vue-single-select";
import VueRouter from 'vue-router'
Vue.use(VueRouter);
// Vue.component('vue-single-select', VueSingleSelect);

var restaurantsRef = db.ref("restaurant");
var cuisinesRef = db.ref("cuisine");

export default {
    components:{
        SpinnerLoader
    },
    props: ['restaurants'],
    data() {
        return {
            selectedItem:{},
            isLoading: true,
            isDelete:false,
            fullPage: true,
            message:'Loading ...',
            _restaurants: [],
            _link: null,
            headers: [
                { text: 'Nom', value: 'nom' },
                { text: 'Description', value: 'description' },
                { text: 'Cuisine', value: 'cuisine' },
                { text: 'Modifier', value: '' },
                { text: 'Supprimer', value: '' }
            ],
            options: {
                color: "primary",
                width: 450,
                zIndex: 200
              }
        }
    },
    methods: {
        cancelDeleteItem(){
            this.isDelete = false;
        },
        deleteItem(item){
            this.selectedItem = item;
            this.isDelete = true;
        },
        remmoveRestaurant() {
            var index = this.listOfRestaurants.findIndex(el => el.key == this.selectedItem.key);
            var toDeleteRef = restaurantsRef.child(this.selectedItem.key);
            debugger
            toDeleteRef.remove()
            this.listOfRestaurants.splice(index, 1);
            this.isDelete = false;
        },
        getLink(item) {
            return
        },
        goToForm: function (platToEdit) {
            this.$router.push('/admin/restaurant-form/' + JSON.stringify(platToEdit));
        },
        getLink: function (platToEdit) {
            return '/admin/restaurant-form/' + JSON.stringify(platToEdit);
        }
    },
    mounted() {
    },
    computed: {
        listOfRestaurants: {
            get: function () {
                this.isLoading = true;
                var index = 0;
                return this.restaurants.map(item => {
                    index++;
                    if(index == this.restaurants.length){
                        this.isLoading = false;
                    }
                    return {
                        resto: item,
                        cuisine: item.cuisine
                    };
                });
            }
        },
        selectedRestaurant: {
            get: function () {
                return this._restaurant;
            },
            set: function (newVal) {
                this._restaurant = newVal;
            }
        },
        link: {
            get: function () {
                return this._link;
            },
            set: function (platToEdit) {
                this._link = '/admin/restaurant-form/' + JSON.stringify(platToEdit);
            }
        }
    }

}