/*
* 1. 引入 vue
* 2. 引入 app.vue 用它的内容替换 div#app 内容
* 3. 构建 vue 实例
* */
import Vue from 'vue'
import App from './app.vue'

new Vue({
    // 渲染内容的目的地
    el: '#app',
    // 渲染内容
    render: function (creater) {
        return creater(App)
    }
})
