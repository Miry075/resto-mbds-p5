<template>
    <carousel-3d>
        <slide v-for="(resto, index) in restaurants" :key="index" :index="index" >
            <v-layout wrap>
                <v-flex xs12>
                    <v-card color="purple" class="white--text">
                        <v-layout row>
                            <v-flex xs7>
                                <v-card-title primary-title>
                                    <div>
                                        <div class="headline">{{resto.nom}}</div>
                                        <div>{{resto.cuisine}}</div>
                                    </div>
                                </v-card-title>
                            </v-flex>
                            <v-flex xs5>
                                <v-img
                                    :src=resto.photo
                                    height="125px"
                                    contain
                                ></v-img>
                            </v-flex>
                        </v-layout>
                        <v-divider light></v-divider>
                        <v-card-actions class="pa-3">
                            <v-btn outline color="orange" >Carte & Menu</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </slide>
    </carousel-3d>
</template>

<script src="./restaurant-slider-component.js"></script>
<style src="./restaurant-slider-style.css"></style>
