<template>
	<el-carousel :interval="4000" type="always" indicator-position="outside" height="450px">
	    <el-carousel-item v-for="movie in slide" :key="movie.id">
	      	<img :src="movie.pict" :alt="movie.name" @click="showDetail(movie.id)" />
	      	<h3>{{ movie.name }}</h3>
	    </el-carousel-item>
  	</el-carousel>
</template>

<script>
	export default {
		name: 'Carousel',
	  	components: {
	    	
	  	},
	  	data() {
	      	return {
	        	slide:[],
	      	};
	    },
	    created: function () {
	    	this.getCarousel();

	    },
	    methods: {
	      	showDetail(id){
	      		this.$router.push({
			        name: 'Detail',
			        query: {
			          id: id
			        }
			      })
	      	},
	      	async getCarousel(){
	      		const {data: res} = await this.$http.post("carousel");
	      		/*console.log(res)*/
	      		this.slide = res.fi;
	      	}
	    }
	}
</script>

<style>
	.el-carousel__item h3 {
	    color: #475669;
	    font-size: 14px;
	    opacity: 0.75;
		line-height: 200px;
		margin: 0;
	}
	img{
		cursor: pointer;
	}
</style>