import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import User from './components/User.vue'
import Restaurant from './components/Restaurant.vue'
import Restaurants from './components/Restaurants.vue'
import Commandes from './components/Commandes.vue'

import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

// Définition des routes
Vue.use(Vuetify);
Vue.use(VueRouter);

const routes = [
    {path:'/', component: Restaurants},
    {path:'/restaurants', component: Restaurants},
    {path:'/restaurant/:id', component: Restaurant, props: true},
    {path:'/user', component: User},
    {path:'/commandes', component: Commandes}
]

const router = new VueRouter({
    routes: routes,
    mode:'history'
})

// La ligne ci-dessous rend le composant User utilisable
// partout, dans tous les fichiers .vue
// C'est un GLOBAL COMPONENT
Vue.component("app-user", User);

new Vue({
  el: '#app',
  router:router,
  render: h => h(App)
})
