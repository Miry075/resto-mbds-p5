import Vue from 'vue'
import Component from 'vue-class-component';
import VueRouter from 'vue-router';
import { db, storage } from "../../../../Database";

Vue.use(VueRouter);
var restaurantsRef = db.ref("restaurant");
var cuisineRef = db.ref("cuisine");

export default {
    props: ['restaurant','cuisines'],
    data() {
        return {
            resto:{},
            title: "Image Upload",
            dialog: false,
            imageName: '',
            imageUrl: '',
            imageFile: '',
        }
    },
    methods:{
        goToList:function(){
            this.$router.push('/admin/restaurants');
        },
        pickFile () {
            this.$refs.image.click()
        },
        saveRestaurant(){
            //upload images
            var this_s = this;
            //create if kay is undefined
            if(!this.restaurantToSave.key){
                var path = "restau-buffa-images/" + this.imageName;
                var storageRef = storage.ref(path);
                var uploadTask = storageRef.put(this.imageFile);
                uploadTask.on("state_changed", function progress(snapshot) {
                    storageRef.getDownloadURL().then(res => {
                        this_s.restaurantToSave.image = res;
                        var ref = restaurantsRef.push({
                            nom: this_s.restaurantToSave.nom,
                            cuisine: this_s.restaurantToSave.cuisine ? this_s.restaurantToSave.cuisine.key : '',
                            image:res,
                            description: this_s.restaurantToSave.description})
                    });
                });
            }
            else{ //update if already existing in the data base
                var getByRef = restaurantsRef.child(this.restaurantToSave.key).update(this.restaurantToSave);
            }
        },
        onFilePicked (e) {
			const files = e.target.files
			if(files[0] !== undefined) {
				this.imageName = files[0].name
				if(this.imageName.lastIndexOf('.') <= 0) {
					return
				}
				const fr = new FileReader ()
				fr.readAsDataURL(files[0])
				fr.addEventListener('load', () => {
					this.imageUrl = fr.result
					this.imageFile = files[0] // this is an image file that can be sent to server...
				})
			} else {
				this.imageName = ''
				this.imageFile = ''
				this.imageUrl = ''
			}
		}
    },
    mounted() {
        this.resto = JSON.parse(this.restaurant);
    },
    computed: {
        restaurantToSave: {
            get: function () {
                return this.resto;
            },
            set: function (newVal) {
                this.resto = newVal;
            }
        }
    }
}
