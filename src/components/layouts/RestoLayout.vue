<template>
    <v-content id="content-buffa">
        <v-content grid-list-md text-xs-center>
            <Header></Header>
        </v-content>
        <v-container id="container-buffa" grid-list-md fluid text-xs-center>
            <Content></Content>
        </v-container>
    </v-content>
</template>
<style lang="css">
    #content-buffa{
        padding: 0px 0px 0px!important;
    }
    .theme--light.v-table {
        background-color: #f5f5f5;
        color: rgba(0, 0, 0, 0.87);
        opacity: 0.9;
    }
</style>
<script>
import Header from "./Header.vue";
import Content from "./content/Content.vue";
import LoginSubscribe from '../login-subscribe/LoginSubscribe.vue'


export default {
    data(){
        return {
        }
    },
    methods:{
        
    },
    components: {
        Header,
        Content,
        LoginSubscribe
    }
};
</script>
