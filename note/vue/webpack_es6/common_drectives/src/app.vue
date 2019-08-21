<template>
  <div>
    <pre>
      常用指令
       v-text 是元素的 innerText，只能在双标签中使用
      <!-- 在这里添加了一个xxx变量，如果不加这个变量的话会报错 -->
       v-html 是元素的 innerHtml，不能在html变量中调用别的变量，会把{{xxx}}原样输出

       v-if 元素是否移除或者插入 (为false的话是审查元素时是没有该元素的)

       v-show 元素是否显示或者隐藏 (为false的话是审查元素时是有该元素的，不过style属性加了个display：none)

       v-model 双向数据流的体现，js内存改变页面，页面也可以改变js内存
    </pre>

    v-text:<br>
    <span v-text="text"></span>
    <hr>
    v-html:
    <p v-html="html"></p>
    <hr>
    v-if:
    <div v-if="if02" style="height: 100px;background-color: deeppink"></div>
    <div v-if="if01" style="height: 100px;background-color: hotpink"></div>
    <hr>
    v-show:
    <div v-show="show01" style="height: 100px;background-color: skyblue"></div>
    <div v-show="show02" style="height: 100px;background-color: yellowgreen"></div>
    <hr>
    v-model:
    <input type="text" name="" v-model="mText">{{mText}}<br>
    给下面的 input 的 value 赋值用 v-bind:value = "mText"<br>
    <!-- 这个指令是单单向的，仅js内存改变影响他 -->
    <input type="text" name="" v-bind:value="mText">
  </div>
</template>
<script>
    export default {
        data: function () {
            return {
                xxx: '{{xxx}}',// 防止 pre 标签中解释时报错
                text: '我是 v-text! ',
                html: `
                  <ul>
                    <li>哈哈</li>
                    <li>{{text}}</li>
                  </ul>
                `,
                if01: true,
                if02: false,
                show01: true,
                show02: false,
                mText: '哈哈'
            }
        }
    }
</script>
<style>

</style>