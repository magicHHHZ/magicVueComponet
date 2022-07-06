<template>
  <div>
    <h2>{{title}}</h2>
    <Blogs/>
  </div>
</template>

<script>
import Blogs from "./compentents/Blogs";
export default {//配置对象
  data() {
    return {
      title:'APP组件3333'
    }
  },
  components:{
    Blogs
  }
}
</script>

<style></style>