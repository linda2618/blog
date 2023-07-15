import { createApp } from 'vue'
import App from './App.vue'
import "./style.css"

// 安装 axios ,pinia,sass,vue-router,naive-ui,wangeditor 5富文本编辑
import naive from "naive-ui"
import  {createDiscreteApi} from "naive-ui"
import {router} from './router/index.js'
import {createPinia} from 'pinia'
import axios from "axios"
import { AdminStore } from './stores/AdminStore.js'


axios.defaults.baseURL = "http://localhost:8080"  //服务器全局地址

const { message, notification, dialog } = createDiscreteApi( ['message', 'dialog', 'notification', 'loadingBar'])

//创建app实例
const app = createApp(App)
app.provide("axios", axios)//方法注入(使用的名字， 真正注入的程序)
app.provide("message", message)
app.provide("dialog", dialog)
app.provide("notification", notification)
app.provide("server_url", axios.defaults.baseURL )

app.use(router)
app.use(naive)

app.use(createPinia())
const adminStore = AdminStore()

//axios请求拦截器（每个axios请求 都将先被拦截 进行一些加工操作）
axios.interceptors.request.use((config) => {
    config.headers.token = adminStore.token
    return config
})


app.mount('#app')
