import Vue from "vue";
import App from "./app";//引入自定义组件


import "./base.css";

Vue.config.productionTip = false //不显示不是生产环境的提示
new Vue({
  // el:'#root'
  components:{
    App:App
  },
  template:'<App/>'
}).$mount('#root')