import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: "history",
    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/Login.vue'),
        },
        {
            path: '/authors',
            name: 'authors',
            component: () => import('@/views/Authors.vue'),
        },
        {
            path: '/books',
            name: 'books',
            component: () => import('@/views/Books.vue'),
        },
        {
            path: '*',
            redirect: 'error-404',
        },
    ],
})

export default router
