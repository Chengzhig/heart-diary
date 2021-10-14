import Vue from 'vue'
import App from './App'
// uview UI库
import uView from "uview-ui";
Vue.use(uView);

// vuex
import store from './store'  
Vue.prototype.$store = store  


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App,
	store
})
app.$mount()
