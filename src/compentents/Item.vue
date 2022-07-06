<template>
   <li :style="{background: bgColor}" @mouseenter="handleEnter(true)" @mouseleave="handleEnter(false)">
      <label>
        <input type="checkbox" v-model="isCompleted"/>
        <span>{{todo.title}}</span>
      </label>
      <button class="btn btn-danger" v-show="isShow" @click="deleteItem">删除</button>
    </li>
</template>

<script type="text/ecmascript-6">
import PubSub from 'pubsub-js'
export default {
  props:{//声明属性名和属性值的类型
    todo: Object,
    index: Number,
    // updateTodo: Function
  },
  data() {
    return {
      bgColor: 'white',
      isShow: false
    }
  },
  computed:{
    isCompleted:{
      get () {
        return this.todo.completed
      },
      set(value){
        // this.updateTodo(this.todo,value)
        PubSub.publish('updateTodo',{todo: this.todo, isCheck: value})
      }
    }
  },
  methods: {
    handleEnter(isEnter){
      if(isEnter){
        this.bgColor = '#aaaaaa'
        this.isShow = true
      }else{
        this.bgColor = '#ffffff'
        this.isShow = false
      }
    },
    deleteItem(){
      if (window.confirm("确定删除吗?")) {
        // this.deleteTodo(this.index)
        // 通过XXX来分发事件
        this.$globalEventBus.$emit('deleteTodo',this.index)
      }
    }
  },
};
</script>

<style scoped>
  /*item*/
  li {
    list-style: none;
    height: 36px;
    line-height: 36px;
    padding: 0 5px;
    border-bottom: 1px solid #ddd;
  }

  li label {
    float: left;
    cursor: pointer;
  }

  li label li input {
    vertical-align: middle;
    margin-right: 6px;
    position: relative;
    top: -1px;
    
  }

  li button {
    float: right;
    
    margin-top: 3px;
  }

  li:before {
    content: initial;
  }

  li:last-child {
    border-bottom: none;
  }
</style>