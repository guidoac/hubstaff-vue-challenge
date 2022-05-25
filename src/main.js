import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/http'
import './plugins/bootstrap-vue'
import './plugins/filters'
import App from './App.vue'
import router from './router'
import store from './store'
import './scss/global.scss'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
