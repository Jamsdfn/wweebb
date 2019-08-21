<template>
  <div>
    我是头部 <br>
    {{textOne}}<br>
    {{textTwo}}
  </div>
</template>

<script>
    export default {
        name: "header",
        data: function () {
            return {

            }
        },
        // 接收父组件值参数的设置
        props: ['textOne','textTwo']
    }
</script>

<style scoped>
  div {
    height: 100px;
    background-color: yellowgreen;
  }
</style>