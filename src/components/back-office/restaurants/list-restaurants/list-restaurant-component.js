import Vue from 'vue'
import Component from 'vue-class-component';
import { db } from "../../../../Firebase";
import VueSingleSelect from "vue-single-select";
import VueRouter from 'vue-router'
Vue.use(VueRouter);
Vue.component('vue-single-select', VueSingleSelect);

var restaurantsRef = db.ref("restaurant");
var cuisinesRef = db.ref("cuisine");

export default {
    props: ['restaurants'],
    data() {
        return {
            _restaurants: [],
            _link: null,
            headers: [
                { text: 'Nom', value: 'nom' },
                { text: 'Description', value: 'description' },
                { text: 'Cuisine', value: 'cuisine' },
                { text: 'Edit', value: '' },
                { text: 'Ajouter', value: '' }
            ],
        }
    },
    methods: {
        remmoveRestaurant(key) {
            restaurantsRef.child(key).remove();
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
                return this.restaurants.map(item => {
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