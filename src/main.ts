import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.less';
import router from './router'
Vue.use(Antd);
Vue.config.productionTip = false
// Vue.use(SearchTree);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
