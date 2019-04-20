import Vue from 'vue'
import Component from 'vue-class-component';
import store from '../../../store';


export default {
    props: ['plats', 'type', 'outputData'],
    data() {
        return {
            search: '',
            _plats: [],
            itemChecker: null,
            selected: [],
            numberOfOrder: 1,
            _expanded: false,

            mainHeaders: [
                { text: 'Photo', value: 'image' },
                { text: 'Nom du plat', value: 'nom' },
                { text: 'Prix', value: 'age' }
            ],

            get expanded() {
                return this._expanded;
            },
            set expanded(newValue) {
                his._expanded = newValue;
            }
        }
    },
    mounted() {
        // this.listOfPlats = this.plats;
        console.log('this.selected::: ' + this.selected);
    },
    methods: {
        onSearch() {
            // this.
        },
        clickRow(item) {
            if (store.state.user) {
                this.plats.forEach(element => {
                    this.$set(this.$refs.dTable.expanded, element.name, false);
                });
                if ((this.itemChecker && this.itemChecker.name != item.name) || !this.itemChecker) {
                    this.$set(this.$refs.dTable.expanded, item.name, true);
                    this.itemChecker = item;
                }
                else {
                    this.itemChecker = null;
                }
            }
        },
        addToOrder(item) {
            if (this.outputData) {
                var exist = this.outputData.find(el => el.key == item.key);
                if (exist) {
                    exist.quantite = Number(exist.quantite) + Number(this.numberOfOrder);
                    exist.prixTotal = Number(exist.quantite) * Number(item.prix);
                } else {
                    var total = Number(this.numberOfOrder) * Number(item.prix);
                    this.outputData.push({
                        key: item.key,
                        image: item.image,
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
        }
    },
    computed: {
        listOfPlats: {
            get: function () {
                return this.plats.filter(plat => {
                    return (
                        plat.name.toLowerCase().includes(this.search.toLowerCase())
                    );
                });
            },
            set: function (newVal) {
                this.plats = newVal;
            }
        }
    }

}
