<template>
    <div class="container">
        <div class="nav">
            <div @click="homepage">首页</div>
            <div>
                <n-popselect @update:value="searchByCategory" v-model:value="selectCategory" :options="categoryOptions"
                    trigger="click">
                    <div>分类<span>{{ categoryName }}</span></div>
                </n-popselect>
            </div>
            <div @click="dashboard">后台</div>
        </div>
        <n-divider />

        <n-space>
            <div class="search">
                <n-input v-model:value="pageInfo.keyword" :style="{ width: '500px' }" placeholder="请输入关键字" />
                <n-button type="primary" ghost @click="loadBlogs(0)">搜索</n-button>
            </div>
        </n-space>

        <div v-for="(item, id) in blogList" :key="id" class="blogList">
            <n-card :title="item.title" @click="toDetail(item)">
                {{ item.content }}
                <template #footer>
                    <n-space align="center">
                        <div class="time">发布时间： {{ item.create_time }}</div>
                    </n-space>
                </template>
            </n-card>
        </div>
        <div v-if="showNoData">
            <NoData></NoData>
        </div>

        <n-pagination @update:page="loadBlogs" v-model:page="pageInfo.page" :page-count="pageInfo.pageCount" />

        <n-divider />
        <div class="footer">
            <div>Power by lin大壮</div>
            <div>XICP备 xxxx号-1</div>
        </div>

        <n-divider />
    </div>
</template>

<script setup>
import { ref, reactive, inject, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router';
import NoData from '../components/Nodata.vue'

const axios = inject("axios")
const message = inject("message")
const router = useRouter()

const selectCategory = ref(0)
const categoryOptions = ref([])

onMounted(() => {
    loadCategory()
    loadBlogs()
})

const categoryName = computed(() => {
    let selectOpt = categoryOptions.value.find((options) => { return options.value == selectCategory.value })
    return selectOpt ? selectOpt.label : ""
})
//查询分类
const loadCategory = async () => {
    let res = await axios.get('/category/getList')

    categoryOptions.value = res.data.rows.map((item) => {
        return {
            label: item.name,
            value: item.id
        }
    })
}

//博客列表
const blogList = ref([])

//定义分页
const pageInfo = reactive({
    page: 1,
    pageSize: 5,
    pageCount: 0, //页数
    count: 0,  //总数
    keyword: "",
    category_id: 0
})
const showNoData = ref(false)

//查询所有博客文章内容
const loadBlogs = async (page = 0) => {
    if (page != 0) {
        pageInfo.page = page
    }
    showNoData.value = false
    let res = await axios.get(`/blog/search?keyword=${pageInfo.keyword}&page=${pageInfo.page}&pageSize=${pageInfo.pageSize}&category_id=${pageInfo.category_id}`)
    // console.log(res.data.data)

    let temp = res.data.data.rows
    for (let row of temp) {
        row.content += '....'
        let date = new Date(row.create_time)
        row.create_time = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日   ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    }

    if(temp.length == 0){
        showNoData.value = true
    }
    blogList.value = temp
    pageInfo.count = res.data.data.count
    pageInfo.pageCount = Math.ceil(pageInfo.count / pageInfo.pageSize)
}
//分类
const searchByCategory = (e) => {
    // console.log(e)  //id值
    pageInfo.category_id = e
    loadBlogs()

}


const toDetail = (blog) => {
    // console.log(blog.id)
    router.push({ path: '/detail', query: { id: blog.id } })

}
//首页
const homepage = () => {
    router.push('/')
}
//后台
const dashboard = () => {
    router.push('/login')

}

</script>

<style lang="scss" scoped>
.container {
    width: 1200px;
    margin: 0 auto;
    min-height: 600px;
}

.nav {
    display: flex;
    color: #67646A;
    font-size: 18px;
    padding-top: 20px;

    div {
        cursor: pointer;
        margin-right: 20px;

        &:hover {
            color: tomato;
        }
    }

    span {
        font-size: 12px;
    }
}

.footer {
    color: #64676a;
    text-align: center;
    font-size: 14px;
    line-height: 25px;
}

.search {
    margin-bottom: 10px;
}

.blogList {
    margin-bottom: 20px;
    cursor: pointer;
    opacity: 0.9;
}
</style>