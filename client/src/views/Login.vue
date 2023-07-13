<template>
    <div class="login_panel">
        <n-card title="登录">
            <n-form :model="admin" :rules="rules">
                <n-form-item path="account" label="账号">
                <n-input v-model:value="admin.account"  placeholder="请输入账号"/>
                </n-form-item>
                <n-form-item path="password" label="密码">
                <n-input
                    v-model:value="admin.password"
                    type="password"
                    placeholder="请输入密码"
                />
                </n-form-item>
            </n-form>
            <template #footer>
                <n-checkbox v-model:checked="admin.rember" label="记住我" />
                <n-button @click="login">登录</n-button>
            </template>
        </n-card>
    </div>
</template>

<script setup>
import {ref, reactive, inject} from 'vue'
import { AdminStore } from '../stores/AdminStore.js'
import { useRoute, useRouter } from 'vue-router';

const axios = inject("axios")
const message = inject("message")
const adminStore = AdminStore()
const router = useRouter()

const rules = {
    account:[
        {required: true,message: "请输入账号", trigger: 'blur'},
        {min: 5, max: 12, message:"账号长度5~12个字符", trigger: 'blur'}
    ],
    password:[
        {required: true, message: "请输入密码", trigger:'blur'},
        {min: 5, max: 12, message:"账号长度5~12个字符", trigger: 'blur'}
    ]
}
const admin = reactive({
    account: localStorage.getItem("account") || "",
    password: localStorage.getItem("password") || "",
    rember: localStorage.getItem("rember") == 1 || false
})
const login = async() => {
    const data = {
        account: admin.account,
        password: admin.account
    }
    let result = await axios.post('/admin/login',{
        account:admin.account,
        password: admin.password,
    })
    // console.log(result)
    if(result.data.code == 200){
        //登录成功后 把账号 id token 存储到全局的pinia里面
        adminStore.token = result.data.data.token
        adminStore.account = result.data.data.account
        adminStore.id = result.data.data.id
        if(admin.rember){
            localStorage.setItem("account", admin.account)
            localStorage.setItem("password", admin.password)
            localStorage.setItem("rember", admin.rember ? 1 : 0)
        }
        message.info("登录成功")
        router.push("/dashboard")

    }else{
        message.error("登录失败")

    }
}

</script>

<style lang="scss" scoped>
.login_panel{
    width: 500px;
    margin:250px auto;
}
</style>