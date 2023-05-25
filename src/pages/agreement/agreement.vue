<template>
  <web-view :src="src"></web-view>
</template>

<script setup lang="ts">
import router from '@/router'

const src = ref<string>('')
const param = router.getRouteParams('agreement')
src.value = param.url
</script>

<style></style>
