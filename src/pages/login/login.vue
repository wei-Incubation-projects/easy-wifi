<template>
  <view class="login_main">
    <view class="top">
      <image :src="loginConfig.logo"></image>
      <view>{{ loginConfig.page_title }}</view>
      <view
        :style="{
          color: loginConfig.big_label.color,
          fontSize: loginConfig.big_label.font_size,
          fontWeight: loginConfig.big_label.font_size
        }"
        >{{ loginConfig.big_label.text }}</view
      >
    </view>
    <view class="button">
      <button>{{ loginConfig.btn }}</button>
      <view>
        <text>{{ loginConfig.agree_text }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { LoginService, type LoginModel } from '@/api/login'
import { ref, toRefs, onMounted } from 'vue'
const noAgree = ref<boolean>(false)
const loginConfig = toRefs<LoginModel.LoginConfig>({} as LoginModel.LoginConfig)
const getConfig = async () => {
  const result = await LoginService.getLoingConfig()
  console.log(result)
  // loginConfig = { ...(result.data as LoginModel.LoginConfig) }
}
onMounted(() => getConfig())
</script>

<style lang="scss" scoped></style>
