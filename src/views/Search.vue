<template>
  <div class="home">
   	<myhead></myhead>
   	<searchFilmList :msg="msg"></searchFilmList>
   	<myfoot></myfoot>
  </div>
</template>

<script>
// @ is an alias to /src
import Myhead from '@/components/Myhead.vue'
import Carousel from '@/components/Carousel.vue'
import Myfoot from '@/components/Myfoot.vue'
import LoginRegisterComp from '@/components/LoginRegisterComp.vue'
import SearchFilmList from '@/components/SearchFilmList.vue'
//import Detail from '@/components/Detail.vue'

export default {
  name: 'Search',
  components: {
    myhead :Myhead,
    carousel :Carousel,
    myfoot: Myfoot,
    loginRegisterComp: LoginRegisterComp,
    searchFilmList: SearchFilmList,
    //detail: Detail,
  },
  data(){
  	return {
  		msg:'搜索结果',
  	}
  }
}
</script>