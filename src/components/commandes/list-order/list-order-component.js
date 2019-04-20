import Vue from 'vue'
import Component from 'vue-class-component';
import { mapState } from "vuex";

export default {
    props: ['orders'],
    data() {
        return {
            itemChecker: null,
            numberOfOrder: 0,
            mainHeaders: [
                { text: 'Photo', value: 'image' },
                { text: 'Nom du plat', value: 'name' },
                { text: 'Type', value: 'type' },
                { text: 'Prix unité', value: 'prix' },
                { text: 'Quantité', value: 'quantite' },
                { text: 'Total', value: '' }
            ]
        }
    },
    methods: {
        formatPrice(value) {
            let val = (value / 1).toFixed(2).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
        clickRow(item) {
            this.orders.forEach(element => {
                this.$set(this.$refs.dTable.expanded, element.name, false);
            });
            if ((this.itemChecker && this.itemChecker.id != item.id) || !this.itemChecker) {
                this.$set(this.$refs.dTable.expanded, item.name, true);
                this.itemChecker = item;
            }
            else {
                this.itemChecker = null;
            }
        },
        removeOrder(item, number) {
            var obj = this.orders.find(el => el.id == item.id);
            var index = this.orders.findIndex(el => el.id == item.id);
            if (obj) {
                if (obj.quantite <= number) {
                    this.orders.splice(index, 1);
                }
                else if (obj.quantite > number) {
                    obj.quantite -= number;
                }
                item.prixTotal = Number(obj.prix) * Number(obj.quantite);
            }
            number = 0;
            this.$set(this.$refs.dTable.expanded, item.name, false);
        },
        prixTotal: function () {
            if (this.orders) {
                return this.orders.reduce((c, n) => c.prixTotal + n.prixTotal);
            }
            return 0;
        }
    },
    computed: {
        ...mapState(["user"]),
        totalOrders: {
            get: function () {
                var results = 0;
                if (this.orders && this.orders.length > 0) {
                    results = this.orders.map(item => item.prixTotal).reduce((c, n) => Number(c) + Number(n));
                }
                return results;
            }
        }
    }

}