<template>
  <div>
    请输入内容 <br>
    <input type="text" name="" v-model="text"><br>
    组件显示：{{text | myFilter}} <br>
    全局显示：{{text | myFilter2}}
  </div>
</template>
<script>
    export default {
        data: function () {
            return {
                text: ''
            }
        },
        filters: {
            myFilter: function (value) { // value -> text
                return value.split('').reverse().join('')
            }
        }
    }
</script>
<style>

</style>