import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import User from './components/User.vue'
import routes from './routes/routes';
// import VueGlide from 'vue-glide-js'
// import 'vue-glide-js/dist/vue-glide.css'
import FirebaseAuthPlugin from './FirebaseAuthPlugin'
Vue.use(FirebaseAuthPlugin)

import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

import Carousel3d from 'vue-carousel-3d';

import store from './store'
// import 'swiper/dist/css/swiper.css'

Vue.use(Carousel3d)

// import VueGlide from 'vue-glide-js'

// Définition des routes
Vue.use(Vuetify);
Vue.use(VueRouter);
// Vue.use(VueGlide)

// const routes = [
//     {path:'/', component: Restaurants},
//     {path:'/restaurants', component: Restaurants},
//     {path:'/restaurant/:id', component: Restaurant, props: true},
//     {path:'/menu/:id', component: Menu, props: true},

//     {path:'/user', component: User},
//     {path:'/commandes', component: Commandes}
// ]

const router = new VueRouter({
  routes,
  mode: 'history'
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authRequired)) {
    if (!store.state.user) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

// La ligne ci-dessous rend le composant User utilisable
// partout, dans tous les fichiers .vue
// C'est un GLOBAL COMPONENT
Vue.component("app-user", User);

// new Vue({
//   el: '#app',
//   router:router,
//   render: h => h(App)
// })

new Vue({
  el: "#app",
  render: h => h(App),
  router,
  store
});
