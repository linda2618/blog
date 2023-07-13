import {createRouter, createWebHashHistory} from 'vue-router'

let routes = [
    {path:'/test', component:() => import('../views/Test.vue')},
    {path:'/login', component:() => import('../views/Login.vue')},
    {path:'/dashboard', component:() => import('../views/dashboard/DashBoard.vue')}
]

const router = createRouter({   //设置路由模式
    history: createWebHashHistory(),
    routes
})

export {routes, router}