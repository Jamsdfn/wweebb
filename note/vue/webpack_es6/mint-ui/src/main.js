import Vue from 'vue'
import App from './app.vue'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(Mint)


new Vue({
    el: '#app',
    render: creater => creater(App)
})