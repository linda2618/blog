<template>
    <div>
        <n-button @click="showAddModal = true" type="info">添加</n-button>
        <n-table :single-line="false" bordered striped>
            <thead>
                <tr>
                    <th>编号</th>
                    <th>名称</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in categoryList " :key="index">
                    <td>{{ item.id }}</td>
                    <td>{{ item.name }}</td>
                    <td>
                        <n-button type="success" @click="toUpdate(item)">修改</n-button>
                        <n-button type="warning" @click="deleteCategory(item)">删除</n-button>
                    </td>
                </tr>
            </tbody>
        </n-table>

        <!-- //添加分类弹框 -->
        <n-modal v-model:show="showAddModal" preset="dialog" title="Dialog">
            <template #header>
                <div>
                    添加分类
                </div>
            </template>
            <div>
                <n-input v-model:value="addCategory.name" type="text" placeholder="请输入名称"></n-input>
            </div>
            <template #action>
                <n-button @click="cancelAdd">取消</n-button>
                <n-button @click="addMessage">提交</n-button>
            </template>
        
        </n-modal>

        <!-- //修改分类名称 -->
        <n-modal v-model:show="showUpdateModal" preset="dialog" title="Dialog">
            <template #header>
                <div>
                    修改分类
                </div>
            </template>
            <div>
                <n-input v-model:value="updateCategory.name" type="text" placeholder="请输入名称"></n-input>
            </div>
            <template #action>
                <n-button @click="cancelUpdate">取消</n-button>
                <n-button @click="updateMessage(updateCategory.name)">提交</n-button>
            </template>
        
        </n-modal>
    </div>
</template>

<script setup>
import { ref, reactive, inject, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { AdminStore } from '../../stores/AdminStore.js'


const axios = inject("axios")
const message = inject("message")
const dialog = inject("dialog")
const router = useRouter()
const adminStore = AdminStore()

const categoryList = ref([]) //定义category列表

onMounted(() => {
    loadDatas()
})

//查询所有数据
const loadDatas = async () => {
    let result = await axios.get('/category/getList')
    categoryList.value = result.data.rows
}


//添加、修改数据
const updateCategory = reactive({
    name:'',
    id:0
})

const addCategory = reactive({
    name:''
})

//修改按钮
const toUpdate = (item) => {
    showUpdateModal.value = true
    updateCategory.name = item.name
    updateCategory.id = item.id
}

//弹框操作
const showAddModal = ref(false) //显示隐藏添加弹框
const showUpdateModal = ref(false) //显示隐藏修改弹框

const addMessage = async() => {
    if(!addCategory.name.trim()){
        message.error("请输入内容")
        return
    }

    let res = await axios.post("/category/_token/add", 
    {name: addCategory.name.trim()},
    // {headers: { token: adminStore.token}}  
    //在main.js文件里面写个请求拦截器,省的每个接口都要请求带个{headers:{token: adminStore.token}}
    )

    if(res.data.code == 200){
        message.info(res.data.msg)
        loadDatas()
    }else{
        message.error(res.data.msg)
    }
    addCategory.name = ''
    showAddModal.value = false

}
const updateMessage = async(value) => {  
    if(!updateCategory.name.trim()){
        message.error("请输入内容")
        return
    }
    
    let result = await axios.put('/category/_token/add', updateCategory)
    console.log(result)
    

}
const cancelAdd = () => {
    message.success("取消")
    showAddModal.value = false

}
const cancelUpdate = () => {
    message.success("取消")
    showUpdateModal.value = false
}

//删除按钮
const deleteCategory = async(item) => {
    dialog.warning({
          title: '警告',
          content: '是否删除？',
          positiveText: '是',
          negativeText: '否',
          onPositiveClick: async() => {

            let res = await axios.delete(`/category/_token/delete?id=${item.id}`)
            if(res.data.code == 200){
                loadDatas()
                message.info(res.data.msg)
            }else{
                message.error(res.data.msg)
            }
          },
          onNegativeClick: () => {
            // message.error('取消')
          }
        })

}

</script>

<style lang="scss" scoped>
.n-button {
    margin: 10px 40px;
}
</style>