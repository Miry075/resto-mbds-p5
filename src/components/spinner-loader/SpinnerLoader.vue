<template>
  <v-dialog
        v-model="isLoading"
        persistent
        :width="options.width"
        v-bind:style="{ zIndex: options.zIndex }"
    >
        <v-card :color="options.color" dark>
            <v-card-text>
                {{message}}
                <v-progress-linear
                    indeterminate
                    color="white"
                    class="mb-0"
                ></v-progress-linear>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    dialog: false,
    options: {
      color: "primary",
      width: 290,
      zIndex: 200
    }
  }),

  props: {
    message:'',
    isLoading: true,
    source: String
  },
  components: {
  },

   mounted() {
       if(!this.message){
           this.message = 'Loading ...';
       }
   },
};
</script>
<style>
#header-toolbar {
  padding: 0px 0px 0px !important;
}

.theme--light.v-toolbar {
  /* background-color: #f5f5f5; */
  background-color: #8c590c;
  color: rgba(0, 0, 0, 0.87);
  opacity: 0.9 !important;
}
</style>
