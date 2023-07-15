<template>
    <div>
        <n-card>
            <n-tabs v-model:value="tabValue" type="line" animated>

                <n-tab-pane name="list" tab="文章列表">
                    <div v-for="(item, id) in blogList" :key="id" class="blogList">       
                        <n-card :title="item.title">
                            {{ item.content }}

                            <template #footer>
                                <n-space align="center">
                                    <div class="time">发布时间：  {{ item.create_time }}</div>
                                    <n-button secondary type="success" @click="toUpdate(item)">修改</n-button>
                                    <n-button secondary type="warning" @click="toDelete(item)">删除</n-button>
                                </n-space>
                            </template>
                        </n-card>
                    </div>
                  
                    <!-- 手写分页功能 -->
                    <n-space>
                        <div @click="toPage(Number)" v-for="Number in pageInfo.pageCount">
                            <div :style="'background-color:'+(Number == pageInfo.page? 'pink' : '')" class="littlePage">{{Number}}</div>
                        </div> 
                    </n-space>
                </n-tab-pane>  
                <n-tab-pane name="add" tab="添加文章">
                    <n-form>
                        <n-form-item label="标题">
                            <n-input v-model:value="addArticle.title"  placeholder="请输入标题"/>
                        </n-form-item>
                        <n-form-item label="文章分类">
                            <n-select v-model:value="addArticle.category_id" :options="categoryOptions" />
                        </n-form-item>
                        <n-form-item label="内容">
                            <TextEditor v-model="addArticle.content"></TextEditor>
                        </n-form-item>
                        <n-form-item label="">
                            <n-button @click="add">提交</n-button>
                        </n-form-item>
                    </n-form>
                </n-tab-pane>

                <n-tab-pane name="update" tab="修改">
                     <n-form>
                        <n-form-item label="标题">
                            <n-input v-model:value="updateArticle.title"  placeholder="请输入标题"/>
                        </n-form-item>
                        <n-form-item label="文章分类">
                            <n-select v-model:value="updateArticle.category_id" :options="categoryOptions" disabled/>
                        </n-form-item>
                        <n-form-item label="内容">
                            <TextEditor v-model="updateArticle.content"></TextEditor>
                        </n-form-item>
                        <n-form-item label="">
                            <n-button @click="update">提交</n-button>
                        </n-form-item>
                    </n-form>
                </n-tab-pane>
            </n-tabs>
        </n-card>
    </div>
</template>

<script setup>
import {ref, reactive, inject, onMounted} from 'vue'
import { AdminStore } from '../../stores/AdminStore.js'
import { useRoute, useRouter } from 'vue-router';
import TextEditor from '../../components/TextEditor.vue'

const axios = inject("axios")
const message = inject("message")
const dialog = inject("dialog")
const adminStore = AdminStore()
const router = useRouter()

//添加
const addArticle = reactive({
    category_id:0,
    title:"",
    content:""
})
//修改
const updateArticle = reactive({
    id:0,
    category_id:0,
    title:"",
    content:""
})

const categoryOptions = ref([])
//博客列表
const blogList = ref([])
const tabValue = ref('list')

onMounted(() => {
    loadBlogs()
    loadDatas()
})

//查询所有博客文章内容
const loadBlogs = async() => {
    let res = await axios.get(`/blog/search?page=${pageInfo.page}&pageSize=${pageInfo.pageSize}`)
    // console.log(res)

    let temp = res.data.data.rows
    for(let row of temp){
        row.content += '....'
        let date = new Date(row.create_time)
        row.create_time = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日   ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    }
    blogList.value = temp
    pageInfo.count = res.data.data.count
    pageInfo.pageCount = Math.ceil(pageInfo.count / pageInfo.pageSize)
}
//定义分页
const pageInfo = reactive({
    page:1,
    pageSize:5,
    pageCount:0, //页数
    count: 0  //总数
})



//查询所有分类
const loadDatas = async () => {
    let result = await axios.get('/category/getList')
    categoryOptions.value = result.data.rows.map((item) => {
        return {
            label: item.name,
            value: item.id
        }
    })
}
//提交按钮（为某项分类 添加了blog文章）
const add = async() => {
    let res = await axios.post('/blog/_token/add', {
        category_id: addArticle.category_id,
        title: addArticle.title.trim(),
        content: addArticle.content.trim()
    })
    if(res.data.code == 200){
        message.info(res.data.msg)
        addArticle.title= ""
        addArticle.content = ""
        addArticle.category_id = 0
    }else{
        message.error(res.data.msg)
    }

}
//分页功能
const toPage = async(num) =>{
    pageInfo.page = num
    loadBlogs()
}
//按钮修改 跳转页面
const toUpdate = async(blog) => {
    tabValue.value = 'update'
    let res = await axios.get('/blog/detail?id=' + blog.id)
    // console.log(res)
    updateArticle.id = blog.id
    updateArticle.category_id = res.data.rows[0].category_id
    updateArticle.title = res.data.rows[0].title
    updateArticle.content = res.data.rows[0].content
}
const update = async() => {
    let res = await axios.put('/blog/_token/update', updateArticle)
    if(res.data.code == 200){
        message.info(res.data.msg)
        loadBlogs()
        tabValue.value = "list"

    }else{
        message.error(res.data.msg)
    }
}
const toDelete = async(blog) => {
    dialog.warning({
          title: '警告',
          content: '是否删除？',
          positiveText: '是',
          negativeText: '否',
          onPositiveClick: async() => {
            let res = await axios.delete('/blog/_token/delete?id=' + blog.id)
            if(res.data.code == 200){
                message.info(res.data.msg)
                loadBlogs()

            }else{
                message.error(res.data.msg)
            }
          },
          onNegativeClick: () => {
            message.info('取消')
        }
    })
    
}


</script>

<style lang="scss" scoped>
.blogList{
    margin-bottom: 20px;;
}
.time{
    margin-right: 70px;
}
.littlePage{
    width: 25px;
    height: 25px;
    border-radius: 5px;
    text-align: center;
    font-weight:bold;
}
</style>