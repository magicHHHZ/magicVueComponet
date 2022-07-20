import Vue from "vue";
// import vueResouce from "vue-resource";
import App from "./app";//引入自定义组件
import 'bootstrap/dist/css/bootstrap.css'
import store from './store'



Vue.config.productionTip = false //不显示不是生产环境的提示

// 所有组件对象的原型对象是一个vm对象  ==> Vue原型对象是组件对象原型链上的对象
// 创建一个全局的用于绑定事件监听和分发事件的对象: Global Event Bus(全局事件总线)
// 事件总线对象就是一个vm
// 将其挂载到Vue的原型对象上,所有组件对象就都可以看到这个事件总线对象
// Vue.prototype.$globalEventBus = new Vue()
new Vue({
  
  // el:'#root'
  components:{
    App:App
  },
  template:'<App/>',
  store
}).$mount('#root')