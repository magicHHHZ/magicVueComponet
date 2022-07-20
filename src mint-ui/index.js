import Vue from "vue";
import { Button } from "mint-ui";
import App from "./app";//引入自定义组件




Vue.config.productionTip = false 

//全局注册UI组件
Vue.component(Button.name, Button)
new Vue({
  // el:'#root'
  components:{
    App:App
  },
  template:'<App/>'
}).$mount('#root')