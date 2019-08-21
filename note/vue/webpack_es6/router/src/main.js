import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app.vue'
import Home from './components/home.vue'
import Music from './components/music.vue'
import Movie from './components/movie.vue'


Vue.use(VueRouter)

let router = new VueRouter({
    routes:[
        {
            name: 'home',
            path: '/',
            component: Home
        },
        {
            name: 'movie',
            path: '/movie',
            component: Movie
        },
        {
            name: 'music',
            path: '/music',
            component: Music
        }
    ]
})

new Vue({
    el: '#app',
    router: router,
    render: creater => creater(App)
})