<template>
  <div>
    <h1>第一个 vue 程序</h1>
    <p>{{mtext}}</p>
    <input type="text" v-model="mtext">
  </div>
</template>
<script>
  export default {
    data(){
        return {
            mtext:'大家好，舒服了'
        }
    }
  }
</script>
<style></style>