import Vue from "vue";
import App from "./app";
new Vue({
  // el:'#root'
  components:{
    App:App
  },
  template:'<App/>'
}).$mount('#root')