<template>
  <v-app class="ma-0">
    <v-content>
      <img src="./assets/banner.jpg">
      <router-view/>
    </v-content>
    <v-footer height="auto" color="orange lighten-2">
      <v-layout justify-center row wrap>
        <v-btn v-for="link in links" :key="link" color="white" flat round>{{ link }}</v-btn>
        <v-flex orange lighten-3 py-3 text-xs-center white--text xs12>
          &copy;2019 —
          <strong>Restaurant</strong>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "app",
  data: () => ({
    links: ["Accueil", "A propos", "Equipe", "Services", "Contactez-nous"]
  })
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
