import Vue from 'vue'
import App from './app.vue'

new Vue({
    el: '#app',// 渲染好的 DOM 放置的地方
    render: creater => creater(App)
})