<template>
    <v-container grid-list-md>
        <v-layout wrap>
            <v-flex xs12>
                <v-text-field label="Email*" v-model="email" required></v-text-field>
            </v-flex>
            <v-flex xs12>
                <v-text-field label="Password*" v-model="password" type="password" required></v-text-field>
            </v-flex>
        </v-layout>
        <v-layout>
             <v-flex xs6>
                <v-btn color="blue darken-1" flat @click="login()">S'authentifier</v-btn>
             </v-flex>
        </v-layout>
    </v-container>
</template>

<script src="./login-component.js"></script>
<style src="./login-style.css"></style>
