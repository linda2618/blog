<template>
    <div class="main_panel">
        <div class="menus">
            <div v-for="(item, index) in menus" :key="index" @click="toPage(item)">
            {{ item.name }}</div>
        </div>
        <div class="container">
            <router-view></router-view>
        </div>
    </div>
    <div class="title">blog后台管理</div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';

const router = useRouter()

let menus = [
    {name:"文章管理", href:"/dashboard/article"},
    {name:"分类管理", href:"/dashboard/category"},
    {name:"退出", href:"logout"}
]
const toPage = (item) =>{
    if(item.name == "logout"){
        // router.push("/login")
        console,log('退出成功')
    }else{
        router.push(item.href)
    }

}
</script>

<style lang="scss" scoped>
.main_panel {
  display: flex;
  color: #64676a;
  max-width: 1500px;
  margin: 0 auto;
}
 
.menus {
//   padding: 20px 0;
  box-sizing: border-box;
//   line-height: 60px;
  text-align: center;
  width: 180px;
  height: 95vh;
  border-right: 1px solid #dadada;
 
  // sass里面的写法，menus里面的div鼠标变成手指，一滑过去就变颜色
  div {
    cursor: pointer;
    height: 120px;
    line-height: 120px;
    border-bottom: 1px solid #dadada;
 
    &:hover {
      color: #4ec981;
    }
  }
}
.container{
    width: 100%;
}
 
.title {
  //像水印一样的文字
  font-size: 50px;
  font-weight: bold;
  text-align: right;
  position: fixed;
  color: rgba(0, 0, 0, 20%);
  right: calc((100vw - 1500px) / 2);
  bottom: 20px;
}

</style>