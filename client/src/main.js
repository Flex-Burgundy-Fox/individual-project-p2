import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Toasted from 'vue-toasted';
// import midtransClient from 'midtrans-client';
 
Vue.use(Toasted)
// Vue.use(midtransClient)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
