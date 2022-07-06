<template>
  <div>
    <div class="todo-container">
    <div class="todo-wrap">
      <TodoHeader :addTodo="addTodo"/>
      <TodoList :todos="todos" :deleteTodo="deleteTodo" :updateTodo="updateTodo"/>
      <TodoFooter 
      :todos="todos" 
      :clearCompletedTodos="clearCompletedTodos" 
      :checkAll="checkAll"
      
      />

    </div>
  </div>
  </div>
</template>

<script>
  import Header from "@/compentents/Header";
  import List from "@/compentents/List";
  import Footer from "@/compentents/Footer";
  import { readTodos,saveTodos } from "@/utils/storageUtils.js";
export default {//配置对象
  data() {
    return {
      todos:[]
    }
  },
  mounted() {
    //模拟异步读取数据
    setTimeout(()=>{
      //读取local中保存的todos,更新数据
      this.todos = readTodos()
    },1000)
  },
  methods: {
    addTodo (todo) {
      this.todos.unshift(todo)
    },
    deleteTodo  (index)  {
      this.todos.splice(index, 1)
    },
    clearCompletedTodos(){
      if (window.confirm('确定要删除所有任务吗?')) {
        this.todos = this.todos.filter((todo,index)=> !todo.completed)
      }
      
    },
    checkAll(isCheckAll){
      this.todos.forEach(todo => todo.completed = isCheckAll)
    },
    updateTodo(todo,isCheck){
      todo.completed = isCheck
    }
  },
  watch:{
    //监视todos数据
    todos:{
      deep:true ,//深度监视
      handler (value){//最新的todos值
      //将todos保存到local
        saveTodos(value)

      }
    }
  },
  components:{
    TodoHeader: Header,
    TodoList:List,
    TodoFooter: Footer
  }
}
</script>

<style scoped>
/*app*/
  .todo-container {
    width: 600px;
    margin: 0 auto;
  }
  .todo-container .todo-wrap {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
</style>