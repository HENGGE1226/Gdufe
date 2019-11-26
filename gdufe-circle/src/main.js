// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
// import preview from 'vue-photo-preview'
import animated from 'animate.css'
import gallery from 'img-vuer'
import moment from 'moment'
import 'ant-design-vue/dist/antd.css'
import 'vue-photo-preview/dist/skin.css'
import 'styles/reset.css'
import 'swiper/dist/css/swiper.css'
import { message } from 'ant-design-vue'

// Vue.use(preview);
Vue.use(gallery)
Vue.use(animated);
Vue.use(VueAwesomeSwiper);
Vue.config.productionTip = false;
Vue.prototype.$message = message;
Vue.prototype.$moment = moment;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
