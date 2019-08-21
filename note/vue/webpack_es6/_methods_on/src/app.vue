<template>
  <div>
    <div v-bind:class="isSkyblue ? 'skyblue' : 'yellogreen'">单个class</div>
    <!-- v-bind:xxx 可以简写为 :xxx -->
    <div :class="{'skyblue': isSkyblue, 'big': true}">多个class</div>
    <ul>
      <li v-for="(stu, index) in stus" :class="{'A':'skyblue','B':'yellogreen'}[stu.score]" :data-key="index">
        {{stu.name}}
      </li>
    </ul>
    <button v-on:click="change()">点我00</button>
    <!-- 不传参数可以不加括号 -->
    <button @click="change">点我01</button>
  </div>
</template>
<script>
    export default {
        // 变量
        data: function () {
            return {
                isSkyblue: true,
                stus: [{name: 'Jack', score: 'A'}, {name: 'Rose', score: 'B'}]
            }
        },
    //    声明函数, 属于组件对象
        methods: {
            change: function () {
                // 在 script 中能使用的对象，基本 template 基本也能使用
                // 不过在 script 中要加 this, template 中不需要 this
                this.isSkyblue = !this.isSkyblue
                this.stus.push({
                    name: 'Tom',
                    score: 'A'
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