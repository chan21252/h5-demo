import Vue from 'vue'
import App from './App.vue'
import router from './router'
import rem from './module/rem'

rem(document, window)


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
