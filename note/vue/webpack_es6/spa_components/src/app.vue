<template>
  <div>
    <global-vue></global-vue>
    <button @click="listen">listen</button>
  </div>
</template>
<script>
    import connect from  './connector.js'
    export default {
        // 变量
        data: function () {
            return {
                textTwo: '哈哈哈!'
            }
        },
        methods:{
            listen: function () {
                connect.$on('phone', function (msg) {
                    console.log(msg)
                })
                connect.$on('phone', function (msg) {
                    console.log(msg+'s')
                })
            }
        }

    }
</script>
<style>
  .skyblue {
    height: 100px;
    background: skyblue;
  }

  .yellogreen {
    height: 100px;
    background-color: yellowgreen;
  }

  .big {
    height: 200px;
  }
</style>