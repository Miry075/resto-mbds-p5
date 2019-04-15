<template>
    <v-dialog id="login-subscribe" v-model="dialog[0]" persistent max-width="940px">
        <v-layout row wrap justify-center>
            <v-card>
                <v-card-title>
                    <span class="headline">User Profile</span>
                </v-card-title>
                <v-card-text>
                    <v-layout row wrap>
                        <v-flex xs5>
                            <h2>S'authentifier</h2>
                            <Login></Login>
                        </v-flex>
                        <v-flex xs7>
                            <h2>S'inscrire</h2>
                            <Subscribe></Subscribe>
                        </v-flex>
                    </v-layout>
                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="fermerModal()">Fermer</v-btn>
                </v-card-actions>
            </v-card>
        </v-layout>
    </v-dialog>
</template>
<style>
</style>

<script>
import Subscribe from "../login-subscribe/subscribe/Subscribe.vue";
import Login from "../login-subscribe/login/Login.vue";

export default {
    props: ['dialog'],
    components: {
        Subscribe,
        Login
    },
    methods:{
        fermerModal(){
            this.dialog[0] = false;
            // this.dialog.isOpenModel = false;
        }
    },
  data(){
        return {
            get openModal(){
                return this.dialog && this.dialog.isOpenModel;
            },
        }
    },
}
</script>