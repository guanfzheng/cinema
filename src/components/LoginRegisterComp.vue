<template>
  <div id="container">
  	<el-tabs id="tabs" v-model="loginRegister" type="border-card" @tab-click="handleClick">
  		<!--登录-->
	    <el-tab-pane label="登录" name="login">
	    	<el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-width="100px">
	    		<el-form-item label="用户名" prop="username">
	    			<el-input v-model="loginForm.username"></el-input>
	    		</el-form-item>
	    		
	    		<el-form-item label="密码" prop="password">
	    			<el-input v-model="loginForm.password" type="password"></el-input>
	    		</el-form-item>
	    		
	    		<!--<el-form-item label="验证码" prop="verifyCode">
	    			<el-input v-model="loginForm.verifyCode"></el-input>
	    			<img src="../assets/images/logo.png" @click="changeCode()" alt="点击更换" />
	    		</el-form-item>-->
	    		
	    		<el-form-item  id="panebtn">
	    			<el-button type="primary" @click="handleLogin">登录</el-button>
	    			<el-button @click="handleLoginReset">重置</el-button>
	    		</el-form-item>
	    	</el-form>
	    	
	    </el-tab-pane>
	    
	    <!--注册-->
	    <el-tab-pane label="注册" name="register">
	    	
	    	<el-form :model="registerForm" :rules="registerRules" ref="registerForm" label-width="100px">
	    		<el-form-item label="用户名" prop="username">
	    			<el-input v-model="registerForm.username"></el-input>
	    		</el-form-item>
	    		
	    		<el-form-item label="密码" prop="password">
	    			<el-input v-model="registerForm.password" type="password"></el-input>
	    		</el-form-item>
	    		
	    		<el-form-item label="确认密码" prop="rpassword">
	    			<el-input v-model="registerForm.rpassword" type="password"></el-input>
	    		</el-form-item>
	    		
	    		<el-form-item label="手机" prop="phone">
	    			<el-input v-model="registerForm.phone"></el-input>
	    		</el-form-item>
	    		
	    		<el-form-item label="邮箱" prop="email">
	    			<el-input v-model="registerForm.email"></el-input>
	    		</el-form-item>
	    		
	    		<el-form-item label="地址" prop="address">
	    			<el-input v-model="registerForm.address"></el-input>
	    		</el-form-item>
	    		
	    		<!--<el-form-item label="验证码" prop="verifyCode">
	    			<el-input v-model="registerForm.verifyCode"></el-input>
	    			<img src="../assets/images/logo.png" alt="点击更换" />
	    		</el-form-item>-->
	    		
	    		<el-form-item  id="panebtn">
	    			<el-button type="primary" @click="handleRegister">注册</el-button>
	    			<el-button @click="handleRegisterReset">重置</el-button>
	    		</el-form-item>
	    	</el-form>
	    	
	    </el-tab-pane>
	  </el-tabs>
  </div>
</template>
<script>
  export default {
  	name: 'LoginReisterComp',
  	components: {
    	
  	},
    data() {
      return {
        loginRegister: 'login',
        /*登录*/
        loginForm: {
          username: '',
          password: '',
          /*verifyCode: '',*/
        },
        loginRules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
          ],
          /*verifyCode: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],*/
        },
        
        /*注册*/
       	registerForm:{
       		username: '',
          	password: '',
          	rpassword: '',
          	phone: '',
          	email: '',
          	address: '',
          	/*verifyCode: '',*/
       	},
       	registerRules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
          ],
          rpassword: [
            { required: true, message: '请确认密码', trigger: 'blur' },
            { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
          ],
          email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
          ],
          address: [
            { required: true, message: '请输入住址', trigger: 'blur' },
          ],
          /*verifyCode: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],*/
        },
       	
      };
    },
    methods: {
      	handleClick(tab, event) {
        	console.log(tab, event);
      	},
      
      	/*等录*/
      	async handleLogin(){
      		const {data: res} = await this.$http.post("login",this.loginForm);
      		if(res.flag === true){
      			window.sessionStorage.setItem("username", this.loginForm.username);
      			window.sessionStorage.setItem("icon", res.us[0].icon);
      			this.$router.push({ path: '/home'});
      		}else{
      			this.$message.error("账号密码错误");
      		}
      	},
      	handleLoginReset(){
      		this.loginForm.username = '';
      		this.loginForm.password = '';
      	},
      	
      	
      	/*注册*/
    		async handleRegister(){
    			if(this.registerForm.password == this.registerForm.rpassword){
    				const {data: res} = await this.$http.post("register",this.registerForm);
	      		if(res.flag === true){
	      			window.sessionStorage.setItem("username", this.registerForm.username);
	      			const {data: res1} = await this.$http.post("login",this.registerForm);
	      			if(res1.flag === true){
	      				window.sessionStorage.setItem("icon", res1.us[0].icon);
	      			}
	      			this.$router.push({ path: '/home'});
	      		}
    			}else{
    				this.$message.info("两次密码不一致");
    			}
    		},
    		handleRegisterReset(){
    			this.registerForm.username = '';
      		this.registerForm.password = '';
      		this.registerForm.rpassword = '';
      		this.registerForm.phone = '';
      		this.registerForm.email = '';
      		this.registerForm.address = '';
    		},
    
    }
  };
</script>
<style lang="less" scoped>
	#container {
		display: flex;
		align-items: flex-start;
		justify-content: center;
		margin-top: 30px;
		margin-bottom: 30px;
		#tabs {
			width: 450px;
			
		}
		
		#panebtn {
			display: flex;
			align-items: center;
			justify-content: center;
		}
		
		img {
			height: 20px;
			width: 60px;
		}
	}
	
</style>