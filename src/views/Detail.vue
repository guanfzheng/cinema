<template>
  <div class="home">
   	<myhead></myhead>
   	<detailComp :msg="msg"></detailComp>
   	<myfoot></myfoot>
  </div>
</template>

<script>
// @ is an alias to /src
import Myhead from '@/components/Myhead.vue'
import Myfoot from '@/components/Myfoot.vue'
import DetailComp from '@/components/DetailComp.vue'

export default {
  name: 'Detail',
  components: {
    myhead :Myhead,
    myfoot: Myfoot,
    detailComp: DetailComp,
  },
  created(){
		/*this.cid = this.$route.params.id;
		this.$route.params.id*/
		
  },
  data(){
  	return {
  		cid:'',
  		msg:'',
  	}
  },
}
</script>