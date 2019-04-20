import RestoLayout from '../components/layouts/RestoLayout.vue'
import Restaurant from '../components/restaurants/Restaurant.vue'
import Commande from '../components/commandes/Commande.vue'
import Contact from '../components/contact/Contact.vue'
// import Restaurants from '../components/Restaurants.vue'
import AdminRestaurant from "../components/back-office/restaurants/AdminRestaurant.vue";
import RestaurantForm from "../components/back-office/restaurants/form-restaurants/RestaurantForm.vue";
import Restaurants from '../components/restaurants/Restaurant.vue'
import Login from '../components/login-subscribe/login/login.vue'
import Subscribe from '../components/login-subscribe/subscribe/subscribe.vue'

const routes = [
    {
        path: "/",
        component: RestoLayout,
        redirect: "/commandes",
        children: [
            {
                path: "restaurants",
                name: "Restaurant",
                component: Restaurant
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
                path: "commandes/:id",
                name: "Commandes",
                component: Commande,
                props:true,
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
                path: "admin/restaurants",
                name: "Admin Restaurants",
                component: AdminRestaurant
            },
            {
                path: "admin/restaurant-form/:restaurant",
                name: "Admin Restaurants",
                props: true,
                component: RestaurantForm
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