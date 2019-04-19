import RestoLayout from '../components/layouts/RestoLayout.vue'
import Restaurant from '../components/restaurants/Restaurant.vue'
import Commande from '../components/commandes/Commande.vue'
import Contact from '../components/contact/Contact.vue'
import Restaurants from '../components/restaurants/Restaurant.vue'

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
                name: "Commande",
                component: Commande
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
        ]
    }
];

export default routes;