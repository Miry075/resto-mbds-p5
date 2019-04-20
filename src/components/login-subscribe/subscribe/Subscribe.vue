<template>
  <v-container grid-list-md>
    <v-layout wrap>
      <v-flex xs12 sm6 md6>
        <v-text-field label="Legal first name*" v-model="firstname" required></v-text-field>
      </v-flex>
      <v-flex xs12 sm6 md6>
        <v-text-field
          v-model="lastname"
          label="Legal last name*"      
          required
        ></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-text-field label="Email*" v-model="email" required></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-text-field label="Password*" v-model="password" type="password" required></v-text-field>
      </v-flex>
      <!--    hint="example of persistent helper text"
          persistent-hint
           <v-flex xs12 sm6>
        <v-select :items="['0-17', '18-29', '30-54', '54+']" label="Age*" required></v-select>
      </v-flex> -->
      <!-- <v-flex xs12 sm6>
        <v-autocomplete
          :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
          label="Interests"
          multiple
        ></v-autocomplete>
      </v-flex> -->
    </v-layout>
    <v-layout>
      <v-flex xs12>
        <v-btn color="blue darken-1" flat @click="save()">Sauvegarder</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script src="./subscribe-component.js"></script>
<style src="./subscribe-style.css"></style>
