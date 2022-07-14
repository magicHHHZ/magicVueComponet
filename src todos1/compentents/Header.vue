<template>
  <div class="todo-header">
    <input type="text" placeholder="请输入你的任务名称，按回车键确认" @keyup.enter="add" v-model="title"/>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  // //声明接收属性:更新属性的函数属性
  // props:{//属性名,属性值的类型,属性的必要性
  //   addTodo:{
  //     type: Function,
  //     required: true
  //   }
  // },

  data() {
    return {
      title:''
    }
  },
  methods: {
    add(){

      //根据输入的title封装一个todo对象
      const title = this.title.trim()
      if (!title) {
        alert("请输入正常的数据")
        return
        
      }
      //向todos中添加一个todo
      const todo = {
        id: Date.now(),
        title,
        completed: false
      }

      //调用更新的函数,向todos中添加一个todo

      // this.addTodo(todo)
      // 分发事件
      this.$emit('addTodo',todo)

      this.title=''
    }
  },
};
</script>

<style scoped>
  /*header*/
  .todo-header input {
    width: 560px;
    height: 28px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 4px 7px;
  }

  .todo-header input:focus {
    outline: none;
    border-color: rgba(82, 168, 236, 0.8);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
  }
</style>