<template>
  <div>
    <div v-bind:class="isSkyblue ? 'skyblue' : 'yellogreen'">单个class</div>
    <!-- v-bind:xxx 可以简写为 :xxx -->
    <div :class="{'skyblue': isSkyblue, 'big': true}">多个class</div>
    <hr>
    复杂情况：
    通过遍历，根据当前对象的成绩，匹配成绩和样式的清单对象，用成绩做为 key，
    取对象的 value，最终返回字符串做样式名
    <ul>
      <!-- obj.A 或 obj.B -->
      <li v-for="stu in stus" :class="{'A':'skyblue','B':'yellogreen'}[stu.score]">
        {{stu.name}}
      </li>
    </ul>
  </div>
</template>
<script>
    export default {
        data: function () {
            return {
                isSkyblue: true,
                stus: [
                    {
                        name: 'Jack',
                        score: 'A'
                    },
                    {
                        name: 'Rose',
                        score: 'B'
                    }
                ]
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