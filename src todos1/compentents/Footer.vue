<template>
  <div class="todo-footer">
    <label>
      <!-- <input type="checkbox" v-model="isCheckAll"/> -->
      <slot name="left"></slot>
    </label>
    <!-- <span>
      <span>已完成{{complatedSize}}</span> / 全部{{todos.length}}
    </span> -->
    <slot name="middle"></slot>
    <!-- <button class="btn btn-danger" v-show="complatedSize>0" @click="clearCompletedTodos">清除已完成任务</button> -->
    <slot name="right"></slot>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  // props:{
  //   todos: Array,
  //   clearCompletedTodos: Function,
  //   checkAll:Function
  // },
  computed:{
    complatedSize(){
      return this.todos.reduce((preTotal,todo,index) => preTotal + (todo.completed ? 1 : 0), 0)
    },
    isCheckAll:{
      get(){
        return this.todos.length === this.complatedSize && this.complatedSize>0
      },
      set(value){//value代表当前勾选的Boolean值
        
        this.checkAll(value)
      }
    }
  }
};
</script>

<style scoped>
   .todo-footer {
    height: 40px;
    line-height: 40px;
    padding-left: 6px;
    margin-top: 5px;
  }

  .todo-footer label {
    display: inline-block;
    margin-right: 20px;
    cursor: pointer;
  }

  .todo-footer label input {
    position: relative;
    top: -1px;
    vertical-align: middle;
    margin-right: 5px;
  }

  .todo-footer button {
    float: right;
    margin-top: 5px;
  }
</style>