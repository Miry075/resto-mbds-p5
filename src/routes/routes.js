import RestoLayout from '../components/layouts/RestoLayout.vue'
import Restaurant from '../components/restaurants/Restaurant.vue'
import Commande from '../components/commandes/Commande.vue'
import Contact from '../components/contact/Contact.vue'

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
                name: "Commande",
                component: Commande
            },
            {
                path: "contact",
                name: "Contact",
                component: Contact
            }
        ]
    }
];

export default routes;