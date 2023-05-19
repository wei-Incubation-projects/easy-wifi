<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
import { useUserStore } from './stores/user'

const user = useUserStore()
onLaunch(() => {
  console.log('App Launch')
  // if (user.token) {
  //   plus.navigator.closeSplashscreen()
  // } else {
  //   uni.reLaunch({
  //     url: '/pages/login/login',
  //     success: () => {
  //       plus.navigator.closeSplashscreen()
  //     }
  //   })
  // }
})
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})
</script>
<style></style>
