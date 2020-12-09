import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

//引入axios
import axios from 'axios'
Vue.prototype.$http = axios
axios.defaults.baseURL = "http://localhost:11111"

//全局css配置
import './assets/css/global.css'
//引入font
import './assets/font/iconfont.css'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
