<template>
  <view>开发中 。。。 </view>
</template>

<script setup lang="ts">
import router from '@/router'

const onTabItemTapa = () => {
  // if (router.pages.discover.includes(e.pagePath)) {
  uni.scanCode({
    success: (res) => {
      console.log('scanCode succ', res)
    },
    fail: (err) => {
      console.log('scanCode err', err)
      router.switchTab('index')
    }
  })
  // }
}
onShow(() => onTabItemTapa())
</script>

<style></style>
