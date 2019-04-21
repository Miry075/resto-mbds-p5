<template>
  <div id="header">
    <v-toolbar app flat>
      <v-toolbar-side-icon class="hidden-md-and-up"/>
      <v-container mx-auto py-0 id="header-toolbar">
        <v-layout id="layout-header">
          <v-img
            :src="require('../../assets/logo.png')"
            class="mr-5"
            contain
            height="55"
            width="55"
            max-width="55"
            @click="$vuetify.goTo(0)"
          />
          <v-btn
            v-for="(link, i) in links"
            :key="i"
            :to="link.route"
            class="ml-0 hidden-sm-and-down"
            flat
          >{{ link.text }}</v-btn>
          <v-spacer/>
          <v-btn flat v-show="!user" @click="openDialog()">Log in</v-btn>
          <v-btn flat v-show="!user" @click="openDialog()">S'inscrire</v-btn>
          <v-btn flat v-show="user" @click="myOrders()">Mes Commandes</v-btn>
          <v-btn flat v-show="user" @click="goToAdmin()">Administration</v-btn>
          <v-btn flat v-show="user" @click="logout()">Deconnexion</v-btn>
        </v-layout>
      </v-container>
    </v-toolbar>
    <LoginSubscribe :openDialog="dialog" @update:openDialog="dialog=$event"></LoginSubscribe>
  </div>
</template>

<script>
import LoginSubscribe from "../login-subscribe/LoginSubscribe.vue";
import store from "../../store";
import { mapState } from "vuex";

export default {
  data: () => ({
    drawer: null,
    dialog: false,
    notifications: [
      "Mike, John responded to your email",
      "You have 5 new tasks",
      "You're now a friend with Andrew",
      "Another Notification",
      "Another One"
    ],
    links: [
      {
        icon: "home",
        text: "Nos Restaurants",
        route: "/restaurants-list"
      },
      {
        icon: "description",
        text: "Carte & Menu",
        route: "/commandes/id"
      },
      {
        icon: "contact",
        text: "Nous Contacter",
        route: "/contact"
      }
      
    ]
  }),
  computed: {
    ...mapState(["user"])
  },
  props: {
    source: String
  },
  components: {
    LoginSubscribe
  },
  methods: {
    goToAdmin(){
        this.$router.push('admin/restaurants');
    },
    myOrders(){
        this.$router.push('/my-orders');
    },
    openDialog() {
      this.dialog = true;
    },
    logout() {
      this.$auth.logout();
      sessionStorage.clear();
      this.$router.push('/restaurants-list');
    }
  }
};
</script>
<style>
#header-toolbar {
  padding: 0px 0px 0px !important;
  /* color:thistle!important; */
}

.v-btn__content {
    color:thistle!important;
}


.v-toolbar.theme--light {
  /* background-color: #f5f5f5; */
  background-color: #8c590c;
  color: rgba(0, 0, 0, 0.87);
  opacity: 0.9 !important;
}
</style>
