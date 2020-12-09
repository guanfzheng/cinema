<template>
	<footer>
		<img src="../assets/images/logo.png" alt="logo" />
		<p>Copyright © Zheng. All Rights Reserved.</p>
		<p style="transform: translateY(-18px);">Zheng 版权所有 | <a href="#">关于我们</a> |  <a href="#">联系我们</a></p>
	</footer>
</template>

<script>
	export default {
		name: 'Myfoot',
	  	components: {
	    	
	  	},
	  	data() {
	      	return {
	        	
	      	};
	    },
	    methods: {
	      	
	    }
	}
</script>

<style lang="less" scoped>
	footer{
		display: flex;
		height: 140px;
		background: #444547;
		font-size: 12px;
		color: #777;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		
		img {
			height: 40px;
			width: 40px;
			margin-top: 40px;
		}
		a {
			text-decoration: none;
			font-size: 12px;
			color: #777;
		}
		a:active, a:hover{
			font-size: 12px;
			color: #777;
		}
	}
</style>