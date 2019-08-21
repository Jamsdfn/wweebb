<template>
  <div>
    <sub-vue ref="sub"></sub-vue>
    <div ref="myDiv">{{text}}</div>
  </div>
</template>
<script>
    import subVue from './sub.vue'
    export default {
        data: function () {
            return {
                text: '123'
            }
        },
        components: {
            subVue
        },
    //    组建创建后，数据已经王城初始化，但是 DOM 还未生成
        created: function () {
            console.log('created: ' + this.$refs.myDiv) // undefined
        },
    //    数据装到 DOM 上后，各种数据已经就位，将数据渲染到 DOM 上，DOM 已经生成
        mounted: function () {
            console.log('mounted: ' + this.$refs.myDiv)
            this.$refs.sub.text = '嘻嘻!'
            this.$refs.myDiv.innerHTML = '哈哈哈哈'
        }
    }
</script>
<style scoped>

</style>