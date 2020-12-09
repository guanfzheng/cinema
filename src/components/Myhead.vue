<template>
	<header id="header">
		<div id="content">
			<div id="logo">电影时光</div>
			<el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect" text-color="#000" active-text-color="blue">
				<el-menu-item>
					<el-cascader :options="options" v-model="selectedOptions" @change="handleChange" :separator="' '"></el-cascader>
				</el-menu-item>
				<el-menu-item index="1">
					<span @click="selectCinema">电影</span>
				</el-menu-item>
				<el-menu-item index="2">
					<span @click="selectHot">热点</span>
				</el-menu-item>
			</el-menu>
			
			<div style="display: flex;height: 30px; align-items: center;" v-if="!username">
				<el-button size="medium" round @click="loginRegister">登录 | 注册</el-button>
			</div>
			<div v-else><el-button size="medium" round @click="logout">退出</el-button></div>
			
			<div style="display: flex;height: 30px; align-items: center;margin-left: 25px;" v-if="username" @click="showMyTicket">
				<img style="height: 35px;width: 35px; margin-left: 10px;margin-right: 10px; border-radius: 50%;" :src="headicon" alt="" />
				{{username}}
			</div>
			
			<el-dialog title="我的订票" id="ticket" :visible.sync="dialogFormVisible" width="50%">
				<li style="list-style: none;font-size: 16px;" v-for="ticket in myTickets"><span>票号:{{ticket.id}}</span> <span>地址:{{ticket.location}}</span> <span>电影名:{{ticket.name}}</span> <span>场次:{{ticket.startTime}}</span></li>
			</el-dialog>
			
			
			<div id="search">
				<el-input placeholder="请输入内容" v-model="searchContent" :class="searchWidth" @blur="blurInput" @focus="focusInput">
					<el-select v-model="selectType" slot="prepend" placeholder="请选择搜索类型" >
						<el-option v-for="type in searchType" :label="type.typeName" :key="type.typeId" :value="type.typeId"></el-option>
					</el-select>
					<el-button slot="append" icon="el-icon-search"  @click="search"></el-button>
				</el-input>
			</div>
			
		</div>
		<div id="line"></div>
	</header>	
</template>

<script>
	import options from '../assets/js/country-level2-data.js'
	export default {
		name: 'Myhead',
	  	components: {
	    	
	  	},
	  	data() {
	      	return {
	      		username:'',
	      		headicon: '',
	        	activeIndex: '1',
	        	activeIndex2: '1',
	        	selectedOptions: '',
	        	options:options,
	        	selectType: '电影',
	        	searchContent: '',
	        	myTickets: '',
	        	dialogFormVisible: false,
	        	
	        	searchType:[
		        	{
		        		typeId:'1',
		        		typeName:'电影',
		        	},
		        	{
		        		typeId:'2',
		        		typeName:'演员',
		        	},
	        	],
	        	searchWidth: "blurInput",
	      	}
	    },
	    created: function () {
	    	let username = window.sessionStorage.getItem('username'); 
	    	let headicon = window.sessionStorage.getItem('icon'); 
	    	if(username!==''){
	    		this.username = username;
	    		this.headicon = headicon;
	    	}
		},
	    methods: {
	      	handleSelect(key, keyPath) {
	        	console.log(key, keyPath);
	      	},
	      	handleChange(value) {
	        	console.log(value);
	      	},
	      	selectCinema(){
	      		this.$router.push({ path: '/home'});
	      	},
	      	selectHot(){
	      		alert("没有功能");
	      	},
	      	loginRegister(){
	      		
	      		this.$router.push({
			        name: 'LoginRegister',
			        /*query: {
			          page: '1', code: '8989'
			        }*/
			      })
	      	},
	      	search(){
	      		if(this.searchContent)
		      	{
		      		this.$router.push({
		    			name: "Search",
		    			query: {"name": this.searchContent}
		    		});
	      	
		      	}
		    },
	      	
	      	focusInput(){
	      		this.searchWidth = 'focusInput';
	      	},
	      	blurInput(){
	      		this.searchWidth = 'blurInput';
	      	},
	      	logout(){
	      		this.username = '';
	      		window.sessionStorage.clear();
	      		this.$router.push(
	      			{
	      				name: 'Home',
	      			}
	      		);
	      	},
	      	async showMyTicket(){
	      		this.dialogFormVisible = true;
	    		const {data: res} = await this.$http.post("showmyticket",{name: window.sessionStorage.getItem('username')});
	    		this.myTickets = res.tickets;
	    		console.log(this.myTickets)
	      	}
	    }
	}
</script>

<style lang="less" scoped>
@font-face {
    font-family: 'webfont';
    font-display: swap;
    src: url('../assets/font/webfont.eot'); /* IE9 */
    src: url('../assets/font/webfont.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
    url('../assets/font/webfont.woff2') format('woff2'),
    url('../assets/font/webfont.woff') format('woff'), /* chrome、firefox */
    url('../assets/font/webfont.ttf') format('truetype'), /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/
    url('../assets/font/webfont.svg#webfont') format('svg'); /* iOS 4.1- */
}


#header{
	width: 100%;
	#content{
		width: 80%;
		height: 100%;
		margin: auto;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}
	#line {
		height: 0.5px;
		background: #333;
		transform: translate(0, -1px);
	}
	#logo {
		width: 200px;
		display: flex;
        align-items: center; 
        justify-content: center;
		font-family: "webfont" !important;
	    font-size: 16px;
	    font-style: normal;
	    -webkit-font-smoothing: antialiased;
	    -moz-osx-font-smoothing: grayscale;
	    font-size: 28px;
		margin-right: 25px;
	}
	#search{
		display: flex;
        align-items: center; 
        justify-content: center;
        margin-left: 45px;
	}
}
#ticket {
	span{
		margin-right: 30px;
	}
}
.el-select {
    width: 80px;
}
.focusInput{
	width: 320px;
	transition: width .5s;
}
.blurInput{
	width: 250px;
	transition: width .5s;
}


</style>