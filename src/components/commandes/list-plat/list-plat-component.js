import Vue from 'vue'
import Component from 'vue-class-component';


export default {
    props: ['plats','type','outputData'],
    data() {
        return {
            itemChecker:null,
            selected:[],
            numberOfOrder:1,
            _expanded:false,
            pagination: {
                sortBy: 'name'
              },
            mainHeaders: [
                { text: 'Photo', value: 'image' },
                { text: 'Nom du plat', value: 'name' },
                { text: 'Prix', value: 'age' }
            ],

            get expanded(){
                return this._expanded;
            },
            set expanded(newValue){
                his._expanded = newValue;
            }
        }
    },
    mounted() {
        console.log('this.selected::: '+this.selected);
    },
    methods:{
        clickRow(item){
            this.plats.forEach(element => {
                this.$set(this.$refs.dTable.expanded, element.name, false);
            });
            if((this.itemChecker && this.itemChecker.name != item.name) || !this.itemChecker){
                this.$set(this.$refs.dTable.expanded, item.name, true);
                this.itemChecker = item;
            }
            else{
                this.itemChecker = null;
            }
        },
        addToOrder(item){
            // debugger
            if(this.outputData){
                var exist = this.outputData.find(el => el.name == item.name);
                if(exist){
                    exist.quantite = Number(exist.quantite) + Number(this.numberOfOrder);
                    exist.prixTotal = Number(exist.quantite) * Number(item.prix);
                }else{
                    var total = Number(this.numberOfOrder) * Number(item.prix);
                    this.outputData.push({
                        id:'Id-xxx-'+item.name, 
                        image:item.image, 
                        name: item.name, 
                        type: this.type, 
                        quantite: this.numberOfOrder, 
                        prix: item.prix, 
                        prixTotal: total
                    });
                }
            }
            this.numberOfOrder = 1;
            this.$set(this.$refs.dTable.expanded, item.name, false);
        },

        // totalOrders(){
        //     if(this.outputData && this.outputData.length > 0){
        //         var sum = 0;
        //         this.outputData.array.forEach(element => {
        //             sum += Number(element.prix) * Number(element.quantite);
        //         });
        //     }
        //     this.$emit('total:orders', sum);
        // }

    },
    
}
