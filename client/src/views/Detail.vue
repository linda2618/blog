<template>
    <div class="container">
        <n-button @click="goBack">返回</n-button>
        <!-- 标题 -->
        <n-h1>{{ blogInfo.title }}</n-h1>
        <!-- 文章详情 -->
        <div class="blog_content">
            <div v-html="blogInfo.content"></div>
        </div>

    </div>
</template>

<script setup>
import { ref, reactive, inject, onMounted} from 'vue'
import { useRouter, useRoute } from 'vue-router';

const axios = inject("axios")
const message = inject("message")
const router = useRouter()
const route = useRoute()

onMounted(() => {
    loadBlog()
})

const blogInfo = ref({})
const loadBlog = async() => {
    // console.log(route.query)
    // console.log(route.query.id)
    let res = await axios.get('/blog/detail?id=' + route.query.id)
    blogInfo.value = res.data.rows[0]
}

const goBack = () => {
    router.back()
}
</script>
<style>
.blog_content img{
    max-width: 50%!important;
    display: block;
}
</style>

<style lang="scss" scoped>
.container{
    background-color: rgba(214, 211, 211, 0.7);
    width: 1200px;
    margin: 0 auto;
}
</style>