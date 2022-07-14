<template>
  <div>
    <p v-if="!repoName">loading...</p>
    <p v-else>
      most star repo is
      <a :href="repoUrl">{{repoName}}</a>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      repoName:'',
      repoUrl:''
    }
  },
  mounted() {
    // 利用vue-resource发送ajax请求获取数据
    this.$http.get()

  },
}
</script>

<style scoped>

</style>