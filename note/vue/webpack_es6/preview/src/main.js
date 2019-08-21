import Vue from 'vue'
import App from './app.vue'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import VuePreview from 'vue-preview'
import './global.css'
Vue.use(VuePreview)
Vue.use(Mint)


new Vue({
    el: '#app',
    render: creater => creater(App)
})