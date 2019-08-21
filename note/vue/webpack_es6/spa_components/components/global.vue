<template>
  <div>
    <button @click="call">call</button>
  </div>
</template>

<script>
  import connect from '../src/connector'
    export default {
        name: "global",
        methods:{
            call: function () {
                connect.$emit('phone', '???')
            }
        }
    }
</script>

<style scoped>
  div{
    height: 100px;
  }
</style>