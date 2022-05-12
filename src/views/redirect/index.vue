<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router"

const { params, query } = useRoute()
const { path } = params

useRouter()
  .replace({ path: "/" + path, query })
  .catch((err) => {
    console.warn(err)
  })
</script>

<template>
  <div>
    <p>数据测试</p>
  </div>
</template>
