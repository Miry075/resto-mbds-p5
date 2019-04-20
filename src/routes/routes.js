import RestoLayout from '../components/layouts/RestoLayout.vue'
import Restaurant from '../components/restaurants/Restaurant.vue'
import Commande from '../components/commandes/Commande.vue'
import Contact from '../components/contact/Contact.vue'
import Restaurants from '../components/restaurants/Restaurant.vue'
import Login from '../components/login-subscribe/login/login.vue'
import Subscribe from '../components/login-subscribe/subscribe/subscribe.vue'

const routes = [
    {
        path: "/",
        component: RestoLayout,
        redirect: "/restaurants-list",
        children: [
            {
                path: "restaurants",
                name: "Restaurant",
                component: Restaurant
            },
            {
                path: "commandes/:resto",
                name: "Commande",
                component: Commande,
                props: true
            },
            {
                path: "commandes",
                name: "Commandes",
                component: Commande,
                meta: {
                    authRequired: true
                }
            },
            {
                path: "contact",
                name: "Contact",
                component: Contact
            },
            {
                path: "restaurants-list",
                name: "Restaurants",
                component: Restaurants
            },
            {
                path: "login",
                name: "Login",
                component: Login
            },
            {
                path: "subscribe",
                name: "Subscribe",
                component: Subscribe
            }
        ]
    }
];

export default routes;