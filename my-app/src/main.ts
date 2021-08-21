import Vue from 'vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'

Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
