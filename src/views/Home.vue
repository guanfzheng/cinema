<template>
  <div class="home">
   	<myhead></myhead>
   	<carousel></carousel>
   	<!--<loginRegisterComp></loginRegisterComp>-->
   	<filmList :msg="msg"></filmList>
   	<!--<detail></detail>-->
   	<myfoot></myfoot>
  </div>
</template>

<script>
// @ is an alias to /src
import Myhead from '@/components/Myhead.vue'
import Carousel from '@/components/Carousel.vue'
import Myfoot from '@/components/Myfoot.vue'
import LoginRegisterComp from '@/components/LoginRegisterComp.vue'
import FilmList from '@/components/FilmList.vue'
//import Detail from '@/components/Detail.vue'

export default {
  name: 'Home',
  components: {
    myhead :Myhead,
    carousel :Carousel,
    myfoot: Myfoot,
    loginRegisterComp: LoginRegisterComp,
    filmList:FilmList,
    //detail: Detail,
  },
  data(){
  	return{
  		msg:'热播电影',
  	}
  }
}
</script>
