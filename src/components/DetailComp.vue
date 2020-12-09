<template>
	<div id="container">
		<div id="banner">
			<div id="content">
				<div id="left"><img :src="movie.thumbanil" alt="" /></div>
				<div id="cent">
					<h2>{{movie.name}}</h2>
					<h3>{{movie.type}}</h3>
					<h3>{{movie.releasedate}} {{movie.site}}</h3>
					
					<el-button class="btn" @click="dialogFormVisible = true">购买</el-button>
					
					
					
					<el-button class="btn">评分</el-button>
				</div>
				
				<el-dialog title="选择场次" :visible.sync="dialogFormVisible" width="40%">
					<el-form :model="form">
						<el-form-item label="选择场次" :label-width="formLabelWidth">
							<el-select v-model="selectSession" placeholder="请选择场次">
								<el-option v-for="sess in form.sessionData" :key="sess.id" :label="sess.startTime+' - '+sess.endTime+'     还有'+sess.residue+'张票' " :value="sess.id"></el-option>
							</el-select>
						</el-form-item>
					</el-form>
					<div slot="footer" class="dialog-footer">
						<el-button @click="dialogFormVisible = false">取 消</el-button>
						<el-button type="primary" @click="bugTicket()">确 定</el-button>
					</div>
				</el-dialog>
				
				
				<div id="right">
					<h3>评分</h3>
					<h4 style="color: #ffc600;">{{movie.rank}}</h4>
					<h3>累计票房</h3>
					<h4>{{parseInt(movie.boxOffice/10000)}}万</h4>
				</div>
			</div>
		</div>
		<el-row style="width: 80%; margin: auto; margin-top: 60px;" id="detail">
		  	<el-col id="detailleft" :span="14">
		  		<h2>剧情简介</h2>
		  		<section id="introducton">{{movie.introduction}}</section>
		  		<h2 style="position: relative;"><span>热门短评</span><el-button style="position: absolute;right: 20px;" type="success" size="mini" round >写评论</el-button></h2>
		  		<section v-if="comment">
			  		<section class="comment" :key="com.id"  v-for="com in comment">
			  			<div class="comleft">
			  				<img style="height: 60px;width: 60px; border-radius:50% ;" :src="com.icon"/>
			  			</div>
			  			<div class="comright">
			  				<div class="comrighthead">
			  					<div class="name">{{com.username}}</div>
								<div class="date">{{com.date}}</div>
								<div class="prise">
									<img style="margin-right: 5px;" src="../assets/images/prise.png" alt="" @click="prise" />
									<span>{{com.praise}}</span>
								</div>
			  				</div>
			  				<section class="comrightcontent">
			  					{{com.comment}}	
			  				</section>
			  			</div>
			  		</section>
		  		</section>
		  		<section v-else>暂无评论</section>
		  		
		  		
		  	</el-col>
		  	<el-col id="detailright" :span="10">
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
	  	name: 'Detail',
	  	components: {
	  	},
	    data() {
	      return {
	      	movie:'',
	      	comment:'',
	      	FilmLists:'',
	      	dialogVisible:'false',
	      	dialogFormVisible: false,
	        form: {
	          sessionData: '',
	        },
        	formLabelWidth: '120px',
	      	selectSession:'',
	      }
	    },
	    created(){
	    	let req = {
	    		"id": this.$route.query.id
	    	}
	    	this.getDetail(req);
	    	this.getComment(req);
	    	this.showFilmListHot();
	    	
	    	this.getsessionData();
	    }
	    ,
	    methods: {
	    	prise(){
	    		alert("haha")
	    	},
	    	async getsessionData(){
	    		const {data: res} = await this.$http.post("watchsession",{id:this.$route.query.id});
	    		this.form.sessionData = res.Watch;
	    		console.log(this.form.sessionData)
	    	}
	    	,
	    	async getDetail(req){
	    		const {data: res} = await this.$http.post("detail",req);
	    		this.movie=res.fi[0];
	    	},
	    	async getComment(req){
	    		const {data: res} = await this.$http.post("comment",req);
	    		if(res.com){
	    			this.comment = res.com;
	    		} else{
	    			this.comment = '';
	    		}
	    	},
	    	showDetail(id){
	    		this.$router.replace({
	    			path: "detail",
	    			query: {"id": id}
	    		});
	    		let req = {
		    		"id": this.$route.query.id
		    	}
	    		this.getDetail(req);
	    		this.getComment(req);
	    	},
	    	async showFilmListHot(){
	    		const {data: res} = await this.$http.post("filmlisthot");
	    		this.FilmLists = res.fi;
	    	},
	    	async bugTicket(){
	    		let watchid = this.selectSession;
	    		let username = window.sessionStorage.getItem("username");
	    		let order={
	    			watch:{
	    				id:watchid
	    			},
	    			user:{
	    				username:username
	    			},
	    			fid: this.$route.query.id,
	    		}
	    		if(username){
	    			const {data: res} = await this.$http.post("buyticket",order);
	    			if(res.flag === true){
	    				this.$message.success("购票成功");
	    			}else{
	    				this.$message.error("失败");
	    			}
	    		}else{
	    			this.$message.info("请登录");
	    		}
	    	},
	    	
	    }
	    
	};
</script>

<style lang="less" scoped>
	#banner{
		height: 380px;
		width: 100%;
		background: url(../assets/images/banner.png) no-repeat ;
		display: flex;
		align-items: flex-end;
		justify-content: center;
		
		#content{
			width: 80%;
			display: flex;
			height: 300px;
			
			#left{
				transform: translateX(45px);
				box-shadow: 0px 0px 2px 5px #fefefe;
				
				img {
					height: 330px;
					width: 240px;
				}
			}
			
			#cent{
				width: 400px;
				color: #fff;
				transform: translateX(80px);
				
				h3{
					font-weight: normal;
					font-size: 16px;
				}
				.btn{
					transform: translateY(80px);
					background-color:rgba(0,0,0,0.2);
					color: #fff;
				}
			}
			
			#right{
				width: 300px;
				color: #fff;
				transform: translate(40px, -30px);
				display: flex; 
				flex-direction: column;
				justify-content: flex-end;
				
				h3, h4{
					font-weight: normal;
					margin: 0;
				}
				
				h3 {
					font-size: 12px;
					line-height: 16px;
					height: 16px;
				}
				h4 {
					font-size: 22px;
					line-height: 40px;
					height: 40px;
				}
				
			}
			
		}
	}
	#detail{
		
		#detailleft{
			
			h2{
				border-left: 5px red solid; 
				height: 22px;
				line-height: 22px;
				font-weight: 200;
				font-size: 18px;
				padding-left: 8px;
				margin-top: 50px;
			}
			#introducton {
				line-height: 20px;
				font-size: 15px;
				color: #333;
			}
			.comment{
				display: flex;
				
				.comright{
					width: 100%;
					padding-left: 30px;
					padding-top: 5px;
					
					.comrighthead{
						
						margin-bottom: 5px;
						
						.name,.date{
							padding: 0;
							margin: 0;
							font-weight: normal;
							font-size: 16px;
							height: 20px;
							line-height: 20px;
						}
						.name{
							color: #333;
						}
						.date{
							margin-top: 3px;
							color: #999;
						}
						.prise {
							transform: translate(90%,-30px);
							color: #999;
							
							span{
								height: 16px;
								line-height: 16px;
							}
						}
					}
					
					.comrightcontent{
						font-size: 14px;
						color: #666;
						border-bottom: solid 0.3px #ccc;
						padding-bottom: 30px;
						margin-right: 5px;
					}
					
				}
			}
		}
	}
	#detailright{
			
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
</style>