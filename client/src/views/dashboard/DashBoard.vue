<template>
    <div class="main_panel">

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

</script>

<style lang="scss" scoped>

</style>