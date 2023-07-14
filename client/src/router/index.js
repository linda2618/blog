import {createRouter, createWebHashHistory} from 'vue-router'

let routes = [
    {path:'/test', component:() => import('../views/Test.vue')},
    {path:'/login', component:() => import('../views/Login.vue')},
    {
        path:'/dashboard',  
        redirect: '/dashboard/article',
        component:() => import('../views/dashboard/DashBoard.vue'),
        children:[
            {path:'/dashboard/article', component:() => import('../views/dashboard/Article.vue')},
            {path:'/dashboard/category', component:() => import('../views/dashboard/Category.vue')},
            {path:'/dashboard/logout',redirect:"/login"}
        ]
    }
]

const router = createRouter({   //设置路由模式
    history: createWebHashHistory(),
    routes
})

export {routes, router}