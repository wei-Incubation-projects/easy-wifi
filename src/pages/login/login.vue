<template>
  <img :src="loginConfigs.logo" />
  <view class="login_main">登录 </view>
</template>

<script setup lang="ts">
import { LoginService, type LoginModel } from '@/api/login'
import { useConfigStore } from '@/stores/config'
import { storeToRefs } from 'pinia'
import { ref, onMounted, reactive } from 'vue'

const configStore = useConfigStore()
const noAgree = ref<boolean>(false)
const { loginConfig } = storeToRefs(configStore)
// const loginConfigs = configStore.getLoginConfig
let loginConfigs = reactive({} as LoginModel.LoginConfig)
const getConfig = async () => {
  const result = await LoginService.getLoingConfig()
  loginConfigs = { ...(await configStore.getLoginConfig) }
  console.log(result)
}
onMounted(() => getConfig())
</script>

<style lang="scss" scoped></style>
