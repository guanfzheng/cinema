<template>
  <div class="home">
   	<myhead></myhead>
   	<loginRegisterComp></loginRegisterComp>
   	<myfoot></myfoot>
  </div>
</template>

<script>
// @ is an alias to /src
import Myhead from '@/components/Myhead.vue'
import Myfoot from '@/components/Myfoot.vue'
import LoginRegisterComp from '@/components/LoginRegisterComp.vue'

export default {
  name: 'LoginRegist',
  components: {
    myhead :Myhead,
    myfoot: Myfoot,
    loginRegisterComp: LoginRegisterComp,
  }
}
</script>
