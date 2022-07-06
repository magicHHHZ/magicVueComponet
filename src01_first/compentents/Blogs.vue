<template>
  <div>
    <h2>Blog列表</h2>
    <ul>
      <Blog v-for="(blog, index) in blogs" :key="blog.id" :blog="blog"/>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
import Blog from './Blog'
export default {
  data() {
    return {
      blogs:[
        {id: 1 ,title:'Blog1111'},
        {id: 2 ,title:'Blog2222'},
        {id: 3 ,title:'Blog3333'}
      ]
    }
  },
 components:{
    // 注册局部组件,只能在当前组件中使用
    Blog
  },

  
};
</script>

<style scoped>
  h2 {
    color: red;
  }

</style>