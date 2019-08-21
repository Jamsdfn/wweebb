<template>
  <div>
    <div>{{text}}</div>
  </div>
</template>

<script>
    export default {
        name: "sub",
        data: function () {
            return {
                text: 'lala'
            }
        }
    }
</script>

<style scoped>
  div{
    height: 100px;
    background-color: skyblue;
  }
</style>