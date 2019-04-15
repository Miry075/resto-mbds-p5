import Vue from 'vue'
import Component from 'vue-class-component';


export default {
    props: ['orders'],
    data() {
        return {
            numberOfOrder:0,
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
    methods:{
        removeOrder(item, number){
            var obj = this.orders.find(el => el.id == item.id);
            var index = this.orders.findIndex(el => el.id == item.id);
            if(obj){
                if(obj.quantite <= number){
                    this.orders.splice(index, 1);
                }
                else if(obj.quantite > number){
                    obj.quantite -= number;
                }
            }
            number = 0;
            this.$set(this.$refs.dTable.expanded, item.name, false);
        }
    }
}