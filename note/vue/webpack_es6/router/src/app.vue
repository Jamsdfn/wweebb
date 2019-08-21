<template>
  <div>
    <div class="h">
      <!-- 根据路由规则的名称来找到路径，解耦，防止路由路径改变导致大量地方要跟着改 -->
      <router-link :to="{name:'music'}">进入音乐</router-link>
      <router-link :to="{name:'movie'}">进入电影</router-link>
    </div>
    <router-view class="c"></router-view>
    <div class="f"></div>
  </div>
</template>

<script>
    export default {
        name: "app.vue",
        data: function () {
            return {

            }
        },
        methods: {

        }
    }
</script>

<style scoped>
  .h{
    height: 100px;
    background: yellowgreen;
  }
  .c{
    height: 100px;
    background: skyblue;
  }
  .f{
    height: 100px;
    background: hotpink;
  }
</style>