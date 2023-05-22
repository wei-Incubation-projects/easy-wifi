<template>
  <view class="content"> </view>
</template>

<script setup lang="ts">
import { HomeService, type HomeModel } from '@/api/home'
import router from '@/router'
import { useUserStore } from '@/stores/user'
import { ref, onBeforeMount } from 'vue'

const userStore = useUserStore()
const title = ref('Hello')
const menus = ref<Array<HomeModel.Menu>>([] as HomeModel.Menu[])

const initialization = async () => {
  console.log('token', userStore.token)
  if (!userStore.token) {
    router.reLaunch('login', { url: 'index' })
  }
  const homeData = await (await HomeService.getWifiIndex()).data
  console.log(homeData)
  console.log(homeData.data.bottom_menu)
  if (homeData.code == 0) {
    homeData.data.bottom_menu.forEach((item, key) => {
      uni.setTabBarItem({
        index: key,
        text: item.label,
        iconPath: item.icon,
        selectedIconPath: '/static/'
      })
    })
  }
}

onBeforeMount(() => initialization())
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
