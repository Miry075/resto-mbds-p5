export default {
    data() {
        return {
            email: '',
            password: '',
            firstname: '',
            lastname: ''
        }
    },
    methods: {
        save: function () {
            console.log("register:" + this.email + " " + this.password);
            this.$auth.register(this.email, this.password, this.firstname, this.lastname)
            // dbauth.auth().createUserWithEmailAndPassword(this.email, this.password).then(
            //     (user) => {
            //         // dbauth.database().ref('users/' + user.uid).set({
            //         //     firstname: this.firstname,
            //         //     lastname: this.lastname
            //         // })
            //     },
            //     (err) => {
            //         alert("Error subscribe " + err);
            //     }
            // );
        }
    }
};