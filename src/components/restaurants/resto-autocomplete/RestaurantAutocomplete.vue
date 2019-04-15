<template>
    <v-toolbar
    dark
    color="teal"
    >
        <v-toolbar-title>State selection</v-toolbar-title>
            <v-autocomplete
            v-model="select"
            :loading="loading"
            :items="items"
            :search-input.sync="search"
            cache-items
            class="mx-3"
            flat
            hide-no-data
            hide-details
            label="What state are you from?"
            solo-inverted
            ></v-autocomplete>
            <v-btn icon>
            <v-icon>more_vert</v-icon>
        </v-btn>
    </v-toolbar>
</template>

<script src="./restaurant-autocomplete-component.js"></script>
<style src="./restaurant-autocomplete-style.css"></style>
