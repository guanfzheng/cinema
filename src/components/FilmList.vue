<template>
	<div id="container">
		<el-row :gutter=35>
		  	<el-col id="left" :span="14">
		  		<h2><span>{{msg}}</span></h2>
		  		<el-row :gutter=35>
		  			<el-col :span="8" v-for="filmCard in FilmCards" :key="filmCard.id">
		  				<el-card class="card" :body-style="{ padding: '0px' }">
		  					<img style="width: 100%;" :src="filmCard.thumbanil" class="image" @click="showDetail(filmCard.id)">
		  					<span id="filmname">{{filmCard.name}}</span>
		  					<span id="star">{{filmCard.star}}人想看</span>
		  					<div id="sales"><span style="border-right: 0.5px dotted;">预告片</span><span>预 售</span></div>
		  					<span id="releasedate">{{filmCard.releasedate}}上映</span>
		  				</el-card>
		  			</el-col>
		  		</el-row>
		  		<el-pagination style="margin-top: 30px;" background :current-page.sync="currentPage" :total="totalItems" :page-size="paging.pageSize" layout="prev, pager, next, total, jumper" @current-change="pageChange">
				</el-pagination>
		  	</el-col>
		  	
		  	
		  	<el-col id="right" :span="10">
		  		<el-card class="box-card" style="box-shadow: none;border: none;">
		  			<h2 style="color: #ef4238; font-size: 22px;font-weight: normal;"><span>最受期待</span></h2>
		  			<div style="display: flex;flex-direction: column;">
		  				<div v-for="(fileList,index) in FilmLists" :key="fileList.id" class="text item test">
			  				<div v-if="index == 0" style="display: flex;">
			  					<img :src="fileList.thumbanil" :alt="fileList.name"  @click="showDetail(fileList.id)" style="width: 130px;">
			  					<div style="padding-left: 30px;padding-top: 30px;">
			  						<h3 style="color: #333;padding: 5px;margin: 0;font-size:18px;font-weight: normal;">{{fileList.name}}</h3>
			  						<h3 style="color: #999;padding: 5px;margin: 0;font-size:16px;font-weight: normal;">{{fileList.star}}人想看</h3>
			  						<h3 style="color: #ffb400;padding: 5px;margin: 0;font-size:14px;font-weight: normal;">{{fileList.releasedate}}上映</h3>
			  					</div>
			  				</div>
			  				<div v-else style="height: 40px;line-height: 40px;cursor: pointer;" @click="showDetail(fileList.id)">
			  					<span class="num">{{index+1}}</span>
			  					<span>{{fileList.name}}</span>
			  					<span style="position: absolute;right: 50px;color: #ffb400;font-size:14px;">{{fileList.star}}人想看</span>
			  				</div>
			  			</div>
		  			</div>
		  		</el-card>
		  	</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
  	name: 'FilmLisst',
  	components: {
  	},
  	props: ['msg'],
    data() {
      return {
      	FilmCards:'',
      	FilmLists:'',
      	currentPage: 1, //当前页码
      	totalItems: 0,	//总条数
      	paging: {
			pageStart: 0,
			pageSize: 6,
		},
      }
    },
    created(){
    	this.showFilmList(this.paging);
    	this.showFilmListHot();
    },
    methods: {
    	//page change事件触发
    	pageChange(currentPage) {
			this.paging.pageStart = (currentPage-1) * this.paging.pageSize;
			this.showFilmList(this.paging);
		},
		async showFilmList(paging){
    		const {data: res} = await this.$http.post("filmlist",paging);
    		this.totalItems = res.count;
    		this.FilmCards = res.fi;
    	},
    	showDetail(id){
    		this.$router.push({
    			name: "Detail",
    			query: {"id": id}
    		});
    	},
    	async showFilmListHot(){
    		const {data: res} = await this.$http.post("filmlisthot");
    		this.FilmLists = res.fi;
    	},
    
    }
  };
</script>

<style lang="less" scoped>
	#container{
		width: 80%;
		margin: auto;
		margin-bottom: 20px;
		
		#left{
			
			h2{
				font-size: 22px;
				font-weight: normal;
				color: #509cf2;
				
				span{
					display: inline-block;
					transition: 1s;
				}
			}
			
			h2:hover span{
				transform: translateX(10px);
				transition: 0.5s;
			}
			.card{
				margin-bottom: 25px;
			}
			.card:hover{
				box-shadow:0 0 1px 1px #cdcdcd;
				transform:  scale(1.005);
				transition: 0.1;
			}
			#filmname {
				display: block;
				font-size: 16px;
				color: #fff;
				transform: translate(8px, -35px);
			}
			#star {
				display: block;
				color: #ffb400;
				font-size: 14px;
				background: #fbfbfb;
				height: 35px;
				margin-top: -25px;
				padding-left: 5px;
				line-height: 35px;
			}
			#sales{
				height: 38px;
				line-height: 38px;
				color: #999;
				display: flex;
				
				span {
					width: 50%;
					text-align: center;
				}
					
			}
			#releasedate{
				display: block;
				font-size: 14px;
				color: #999;
				text-align: center;
				margin-bottom: 10px;
			}
			
		}
		#right{
			
			.num{
				margin-right: 10px;
			}
			.text:nth-child(2n-1){
				background: #fbfbfb;
			}
			.test:nth-child(-n+3) .num{
     			color: #ef4238;
     			font-family: "楷体";
     			font-size: 18px;
     			font-style: italic;
			}
			.test:hover {
				background: #fcfcfc;
			}
			
		}
	}
</style>