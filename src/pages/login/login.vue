<template>
  <img :src="loginConfigs.logo" />
  <view class="login_main">
    <button :disabled="noAgree" open-type="" hover-class="button-hover" @click="() => {}">
      登录
    </button>
  </view>
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
// loginConfigs = { ...(await configStore.getLoginConfig) }

const getConfig = async () => {
  const code = await login()
  if (code) {
    const result = await LoginService.byMiniappCode({ code: code })
    console.log('result', result)
  }
}
async function login() {
  return await uni
    .login({ provider: 'weixin' })
    .then((res) => {
      configStore.$patch({
        queryParms: { uid: res.code }
      })
      return res.code
    })
    .catch((err) => {
      console.log(err)
    })
}
onMounted(async () => await getConfig())
</script>

<style lang="scss" scoped></style>
