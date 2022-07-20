import Vue from "vue";
import App from "./app";//引入自定义组件
// import router from './router'
// import 'bootstrap/dist/css/bootstrap.css'
import store from './vuex/store.js'




Vue.config.productionTip = false 


new Vue({
  // el:'#root'
  components:{
    App:App
  },
  template:'<App/>',
  store //所有的组件都能看到一个指定store属性:$store
  // router //所有组件都能通过$router属性看到router对象 /所有组件都有了一个代表当前路由的data数据: $route
}).$mount('#root')