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
            const auth = this.$auth.login(this.email, this.password);
        }
    }
}