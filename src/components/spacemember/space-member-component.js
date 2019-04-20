import Vue from 'vue'
import Component from 'vue-class-component';

import VueSingleSelect from "vue-single-select";

import SpinnerLoader from "../spinner-loader/SpinnerLoader.vue";

Vue.component('vue-single-select', VueSingleSelect);

import { db } from "../../Database";

var cuisineRef = db.ref("cuisine");
var platRef = db.ref("plat");
var platTypeRef = db.ref("type");
var commandeRef = db.ref("commandes");

export default {
    components: {
        SpinnerLoader
    },
    data() {
        return {
            orders: [],
            commandes: [],
            objectOrders: {},
            message: 'Loading ...',
            isLoading: false,
            mainHeaders: [
                { text: 'Photo', value: 'image' },
                { text: 'Nom du Plat', value: 'nom' },
                { text: 'Type du plat', value: 'type' },
                { text: 'Prix unitaire', value: 'prix' },
                { text: 'Quantite', value: 'quantite' },
                { text: 'Prix Total', value: 'prixTotal' },
                { text: 'Détails', value: '' }
            ],
        }
    },
    methods: {
        formatPrice(value) {
            let val = (value / 1).toFixed(2).replace('.', ',')
            return 'Rs ' + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
    },
    computed: {

    },
    mounted() {
        var username = sessionStorage.getItem("username");
        this.isLoading = true;
        commandeRef.orderByChild("user").equalTo(username).once("value", Response => {
            Response.forEach(item => {
                this.orders.push({
                    key: item.key,
                    orderDate: item.child('orderDate').val(),
                    key: item.key,
                    image: item.child('image').val(),
                    name: item.child('name').val(),
                    type: item.child('type').val(),
                    quantite: item.child('quantite').val(),
                    prix: item.child('prix').val(),
                    prixTotal: item.child('prixTotal').val(),
                    user: sessionStorage.getItem("username"),
                    orderId: orderId
                });
                var orderId = item.child('orderId').val()
                if (!this.objectOrders[orderId]) {
                    this.objectOrders[orderId] = [];
                }
                this.objectOrders[orderId].push({
                    key: item.key,
                    orderDate: item.child('orderDate').val(),
                    key: item.key,
                    image: item.child('image').val(),
                    name: item.child('name').val(),
                    type: item.child('type').val(),
                    quantite: item.child('quantite').val(),
                    prix: item.child('prix').val(),
                    prixTotal: item.child('prixTotal').val(),
                    user: sessionStorage.getItem("username"),
                    orderId: orderId
                })

            });
            if (this.objectOrders) {
                var keys = Object.keys(this.objectOrders);
                keys.forEach(key => {
                    var tab = this.objectOrders[key];
                    var prixTotal = 0;
                    if (tab && tab.length > 0) {
                        prixTotal = tab.map(el => Number(el.prixTotal)).reduce((c, n) => c + n);
                    }
                    this.commandes.push({
                        orderId: key,
                        orderDate: tab[0].orderDate,
                        prixTotal: this.formatPrice(prixTotal)
                    });
                });
            }
            this.isLoading = false;
        });
    }
}


