<template>
  <div>
    <div class="todo-container">
    <div class="todo-wrap">
      <!-- <TodoHeader @addTodo="addTodo"/> -->
      <TodoHeader ref="header"/>
      <TodoList :todos="todos" />
      <TodoFooter>
      <input type="checkbox" v-model="isCheckAll" slot="left"/>
      <span slot="middle">
      <span>已完成{{complatedSize}}</span> / 全部{{todos.length}}
      </span>
      <button class="btn btn-danger" v-show="complatedSize>0" @click="clearCompletedTodos" slot="right">清除已完成任务</button>

      </TodoFooter>

    </div>
  </div>
  </div>
</template>

<script>
  import PubSub from 'pubsub-js';
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
  },
  mounted() {
    // 订阅消息
    PubSub.subscribe('updateTodo', (masg, {todo, isCheck}) => {
      this.updateTodo(todo,isCheck)
    })
    // 给<Header/>绑定事件监听
    this.$refs.header.$on('addTodo',this.addTodo)
    //通过XXX来绑定事件监听
    this.$globalEventBus.$on('deleteTodo',this.deleteTodo)

    //模拟异步读取数据
    setTimeout(()=>{
      //读取local中保存的todos,更新数据   
      this.todos = readTodos()
    },1000)
  },

  beforeDestroy() {//在组件销毁之前,移除事件监听
    this.$refs.header.$off('addTodo')
    this.$globalEventBus.$off('deleteTodo')
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