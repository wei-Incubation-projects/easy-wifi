<template class="container">
  <view class="navigation-bar" :style="{ paddingTop: statusBarHeight + 'px' }">
    <view
      class="line1_label"
      :style="{
        color: line1_label?.color,
        fontSize: line1_label?.font_size + 'px',
        fontWeight: line1_label?.is_bold ? 'bold' : ''
      }"
      >{{ line1_label?.text }}</view
    >
    <view
      class="line2_label"
      :style="{
        color: line2_label?.color,
        fontSize: line2_label?.font_size + 'px',
        fontWeight: line2_label?.is_bold ? 'bold' : ''
      }"
      >{{ line2_label?.text }}</view
    >
    <view
      class="line3_label"
      :style="{
        color: line3_label?.color,
        fontSize: line3_label?.font_size + 'px',
        fontWeight: line3_label?.is_bold ? 'bold' : ''
      }"
      >{{ line3_label?.text }}</view
    >
  </view>

  <swiper
    class="swiper"
    :indicator-dots="true"
    :autoplay="true"
    :style="{ height: loop_pics?.height, width: '100%' }"
  >
    <swiper-item v-for="(item, index) in loop_pics?.data" :key="index">
      <image :src="item" mode="aspectFill" style="height: 100%; width: 100%" />
    </swiper-item>
  </swiper>

  <view class="wifi-list">
    <view v-for="(item, index) in wifi_list" :key="index" class="wifi-item">
      <view class="signal"><image :src="other_icon?.wifi4" mode="scaleToFill" /></view>
      <view class="context">
        <view class="ssid">{{ item.SSID }}</view>
        <view class="tip">点击连接WIFI</view>
      </view>
      <view class="button">
        <view class="lock"><image :src="other_icon?.key" mode="scaleToFill" /></view>
        <view class="txt">免费连接</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { HomeService, type HomeModel } from '@/api/home'
import router from '@/router'
import { useUserStore } from '@/stores/user'
import useWifiHook from '@/hooks/useWifiHook'
const userStore = useUserStore()
const title = ref<string>('Hello')
const statusBarHeight = ref<number>(0)
const line1_label = ref<HomeModel.LineLabel>()
const line2_label = ref<HomeModel.LineLabel>()
const line3_label = ref<HomeModel.LineLabel>()
const loop_pics = ref<HomeModel.LoopPics>()
const other_icon = ref<HomeModel.OtherIcon>()
const wifi_list = ref<Array<HomeModel.WifiInfo>>([
  {
    SSID: 'sfsa',
    BSSID: 'adfas',
    secure: true,
    signalStrength: 100,
    frequency: 60
  }
])

const initialization = async () => {
  console.log('home_token', userStore.token)
  if (!userStore.token) {
    router.reLaunch('login', { url: 'index' })
    return
  }
  await uni.hideNavigationBarLoading()
  await setStatusHeight()
  const homeData = await (await HomeService.getWifiIndex()).data
  console.log('homeData', homeData)
  if (homeData.code == 0) {
    title.value = homeData.data.page_title
    line1_label.value = homeData.data.line1_label
    line2_label.value = homeData.data.line2_label
    line3_label.value = homeData.data.line3_label
    loop_pics.value = homeData.data.loop_pics
    other_icon.value = homeData.data.other_icon
    const page = getCurrentPages()
    router.pages.index.includes(page[0].route as string) &&
      homeData.data.bottom_menu.length > 0 &&
      homeData.data.bottom_menu.forEach((item, key) => {
        uni.setTabBarItem({
          index: key,
          text: item.label,
          iconPath: item.icon,
          selectedIconPath: item.selected_icon
        })
      })
    uni.setNavigationBarTitle({ title: title.value })
  }
}
const setStatusHeight = () => {
  const window = uni.getWindowInfo()
  statusBarHeight.value = window.statusBarHeight
  const wifihook = useWifiHook()
  wifi_list.value = wifihook.wifiList.value
  console.log('wifihook', wifihook)
}
onBeforeMount(() => title.value == 'Hello' && initialization())
onReady(() => setStatusHeight())
onShow(() => title.value == 'Hello' && initialization())
</script>

<style lang="scss" scoped>
.container {
  background-color: #686869;
}
.navigation-bar {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  background-color: rgb(54, 87, 170);
  padding-left: 20rpx;
  padding-bottom: 10rpx;
}
.wifi-list {
  width: 92%;
  min-height: 60%;
  margin: 30rpx auto;
  background-color: #ebebec;
  border-radius: 40rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  .wifi-item {
    width: 96%;
    margin-top: 20rpx;
    margin-bottom: 20rpx;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    .signal {
      width: 10%;
      height: 76rpx;
      color: greenyellow;
      image {
        width: 100%;
        height: 100%;
        // font-color: green;
      }
    }
    .context {
      flex: 1;
      // width: 50%;
      margin-left: 20rpx;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      .ssid {
        font-size: 48rpx;
        font-weight: 400;
      }
      .tip {
        font-size: 32rpx;
        font-weight: 100;
      }
    }
    .button {
      width: 30%;
      height: 76rpx;
      background-color: aqua;
      border-radius: 60rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      color: green;
      .lock {
        width: 60rpx;
        height: 60rpx;
        image {
          width: 100%;
          height: 100%;
        }
      }
      .txt {
        font-size: 30rpx;
        font-weight: 300;
      }
    }
  }
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
