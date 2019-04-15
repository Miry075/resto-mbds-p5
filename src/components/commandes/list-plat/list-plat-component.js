import Vue from 'vue'
import Component from 'vue-class-component';


export default {
    props: ['plats','type','outputData'],
    data() {
        return {
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
        addToOrder(item){
            if(this.outputData){
                var exist = this.outputData.find(el => el.name = item.name);
                if(exist){
                    exist.quantite = Number(exist.quantite) + Number(this.numberOfOrder);
                }else{
                    this.outputData.push({id:'Id-xxx-'+item.name, image:item.image, name: item.name, type: this.type, quantite: this.numberOfOrder, prix: item.prix });
                }
            }
            this.numberOfOrder = 0;
            this.$set(this.$refs.dTable.expanded, item.name, false);
        }
    },
    
}
