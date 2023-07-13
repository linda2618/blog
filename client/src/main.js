import { createApp } from 'vue'
import App from './App.vue'
import "./style.css"

// 安装 axios ,pinia,sass,vue-router,naive-ui,wangeditor 5富文本编辑
import naive from "naive-ui"
import  {createDiscreteApi} from "naive-ui"
import {router} from './router/index.js'
import {createPinia} from 'pinia'
import axios from "axios"

axios.defaults.baseURL = "http://localhost:8080"  //服务器全局地址


const app = createApp(App)
const { message, notification, dialog } = createDiscreteApi( ['message', 'dialog', 'notification', 'loadingBar'])
app.provide("axios", axios)//方法注入(使用的名字， 真正注入的程序)
app.provide("message", message)
app.provide("dialog", dialog)
app.provide("notification", notification)

app.use(router)
app.use(naive)
app.use(createPinia())


app.mount('#app')
