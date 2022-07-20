<template>
  <div>
    <p>click {{count}} times,count is {{eventORodd}}</p>
     <button @click="increment">+</button>
     <button @click="decrement">-</button>
     <button @click="incrementIfOdd">increment if odd</button>
     <button @click="incrementAsync">decrement async</button>
  </div>
</template>

<script>
  import { mapState,mapGetters,mapMutations,mapActions } from "vuex";
/**
 * store对象
 * 1.state:包含state数据的对象
 * 2.getters:包含getters计算属性的对象
 * 3.dispatch:(actionsName,data)
 * 4.commit:(mutationsName,data)
 */
export default {
  
  computed:{
    // eventORodd(){
    //   return this.count %2 ===1 ? '奇数':"偶数"
    // },
    // count(){
    //   return this.$store.state.count
    // },
    // eventORodd(){
    //   return this.$store.getters.eventORodd
    // }

    ...mapState(['count']),
    ...mapGetters(['eventORodd'])
  },
  methods: {
    // increment(){
    //   this.$store.commit('INCREMENT')
    // },
    // decrement(){
    //   this.$store.commit('DECREMENT')
    // },
    // incrementIfOdd(){
    //   this.$store.dispatch('incrementIfOdd')
    // },
    // incrementAsync(){
    //   this.$store.dispatch('incrementAsync')
    // },
    ...mapActions(['incrementIfOdd','incrementAsync']),
    ...mapMutations({
      increment:'INCREMENT',
      decrement:'DECREMENT'
    })
  },
  
  
}
</script>

<style scoped>

</style>