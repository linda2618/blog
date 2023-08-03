<template>
      <div class="noStatus-header">
            <div @click="homepage">home</div>
            <div @click="dashboard">后台</div>
        </div>      

</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()
const homepage = () => {
    router.push('/home')
}
const title = 'Welcome to Lin`s blog !'


//获取窗口宽高
const getWindowInfo = () => {
    const windowInfo = {
        width: window.innerWidth,
        hight: window.innerHeight
    }

}

//防抖 ----防止触发频率过高
const debounce = (fn, delay) => {
    let timer

    return function () {
        if (timer) {
            clearInterval(timer)
        }
        timer = setTimeout(() => {
            fn()
        }, delay)
    }
}

const canDebounce = debounce(getWindowInfo, 500);

window.addEventListener('resize', canDebounce);



</script>

<style scoped lang="scss" >
.noStatus-header{
      display: flex;
      justify-content: start;
      margin-left: 40px;
      color:#fff;
      div{
            cursor: pointer;
            margin-right: 20px;
      }
      
}

</style>