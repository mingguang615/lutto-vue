// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import NavLutto from './components/global/NavLutto'
import FooterLutto from './components/global/FooterLutto'
import Modal from './components/global/Modal'
import Pagination from './components/global/Pagination'
import Carousel from './components/global/Carousel'
//引用全局模块
import global_ from './components/global/Global'//引用文件

Vue.prototype.GLOBAL = global_; //挂载到Vue实例上面

Vue.config.productionTip = false


//注册全局组件
Vue.component('nav_lutto',NavLutto);

Vue.component('footer_lutto',FooterLutto);

Vue.component('motal_lutto',Modal);

Vue.component('pagination',Pagination);

Vue.component('carousel',Carousel);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
