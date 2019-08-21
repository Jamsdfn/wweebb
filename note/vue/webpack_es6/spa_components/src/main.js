import Vue from 'vue'
import App from './app.vue'

import globalVue from '../components/global.vue'

Vue.component('globalVue', globalVue)

new Vue({
    el: '.app',
    render: creater => creater(App)
})