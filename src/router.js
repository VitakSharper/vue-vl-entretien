import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'create',
            component: () => import('./views/Create')
        },
        {
            path: '/list',
            name: 'list',
            component: () => import('./views/List')
        },
        {
            path: '/task/:id',
            name: 'task',
            component: () => import('./views/Task')
        }
    ]
})
