import Vue from 'vue'
import Component from 'vue-class-component';

/*
export default {
    props: ['listOfResto'],
        
    // data() {
    //     return {
    //         card_text: 'Lorem ipsum dolor sit amet, brute iriure accusata ne mea. Eos suavitate referrentur ad, te duo agam libris qualisque, utroque quaestio accommodare no qui. Et percipit laboramus usu, no invidunt verterem nominati mel. Dolorem ancillae an mei, ut putant invenire splendide mel, ea nec propriae adipisci. Ignota salutandi accusamus in sed, et per malis fuisset, qui id ludus appareat.'
    //     }
    // }
    
}
*/
import { db } from "../../../Database";

var restaurantsRef = db.ref("restaurant");
var cuisinesRef = db.ref("cuisine");
var platsRef = db.ref("plat");
var menuRef = db.ref("menu");

export default {
    name: "restaurants",
    data() {
        return {
            compteRestaurants: 0,
            restaurants: [],
            nom: "",
            cuisine: "",
            items: []
        };
    },
    mounted() {
        restaurantsRef.once("value", restaurants => {
            restaurants.forEach(restaurant => {
                cuisinesRef
                    .orderByKey()
                    .equalTo(restaurant.child("cuisine").val())
                    .on("child_added", snapshot => {
                        this.restaurants.push({
                            id: restaurant.key,
                            nom: restaurant.child("nom").val(),
                            cuisine: snapshot.child("nom").val(),
                            photo: restaurant.child("photo").val(),
                            description:
                                "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages."
                        });
                    });
            });
            
            // debugger
        });
        cuisinesRef.once("value", cuisines => {
            cuisines.forEach(cuisine => {
                this.items.push(cuisine.child("nom").val());
            });
        });
    },
    computed: {
        objectRestaurant:{
            get:function(){
                var result = [];
                var comptes = this.restaurants.length / 6;
                for (var i = 1; i <= comptes; i++) {
                    result.push(this.restaurants.slice((i -1) * 6, i * 6));
                }
                return result;
            }
        },
        filteredList: {
            get:function(){
                return this.restaurants.filter(restaurant => {
                    if (this.cuisine != undefined) {
                        return (
                            restaurant.nom.toLowerCase().includes(this.nom.toLowerCase()) &&
                            restaurant.cuisine
                                .toLowerCase()
                                .includes(this.cuisine.toLowerCase())
                        );
                    }
                    return restaurant.nom.toLowerCase().includes(this.nom.toLowerCase());
                });
            }
        }
    },
    methods: {
        details: function (id) {
            this.$router.push({ path: `/commandes/${id}` });
        }
    }
};