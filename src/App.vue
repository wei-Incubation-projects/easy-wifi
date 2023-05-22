<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
// import router from '@/router'
// import { useUserStore } from './stores/user'

// const user = useUserStore()
onLaunch(() => {
  console.log('App Launch')
  // if (user.token) {
  //   router.switchTab('index')
  // } else {
  //   router.reLaunch('login')
  // }
})
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})
</script>
<style>
page {
  height: 100%;
}
</style>
