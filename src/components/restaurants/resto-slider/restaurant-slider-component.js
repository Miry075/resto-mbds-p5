
import Vue from 'vue'
// import VueAwesomeSwiper from 'vue-awesome-swiper'
// import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { Carousel3d, Slide } from 'vue-carousel-3d';

// import 'swiper/dist/css/swiper.css'

// Vue.use(Carousel3d)

export default {
  props: ['restaurants'],
  components: {
    Carousel3d,
    Slide
  },
  name: 'carrousel',
  data() {
    return {
      swiperOption: {
        // some swiper options/callbacks
      }
    }
  },
  computed: {

  },
  mounted() {
    // current swiper instance
    console.log('this is current swiper instance object', this.swiper)
  }
}