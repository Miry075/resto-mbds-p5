export default {
    computed: {
        
    },
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
     login() {
            console.log("Login:" + this.email + " " + this.password);
            // const auth = this.$auth.login(this.email, this.password);
            const auth = this.$auth.login(this.email, this.password).then(response => {
                debugger
                sessionStorage.setItem("grant",response);
                sessionStorage.setItem("username",this.email);
            });
            /* dbauth.auth().signInWithEmailAndPassword(this.email, this.password).then(
                 // (user)=>{
                 //     this.$router.push({ path: `/commandes/` });
                 //    console.log(user.credential.accessToken);
                 //    // location.reload();
                 // },
                 // (err)=>{
                 //     alert("Erreur login");
                 // }
 
             ;*/
        }
    }
}