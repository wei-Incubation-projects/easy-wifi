<template>
  <view class="login_main">
    <view class="top">
      <view class="img"><image :src="loginConfig.logo"></image></view>
      <view
        class="title"
        :style="{
          color: loginConfig.big_label.color,
          fontSize: loginConfig.big_label.font_size,
          fontWeight: loginConfig.big_label.font_size
        }"
        >{{ loginConfig.big_label.text }}</view
      >
      <view
        :style="{
          color: loginConfig.small_label.color,
          fontSize: loginConfig.small_label.font_size,
          fontWeight: loginConfig.small_label.font_size
        }"
        >{{ loginConfig.small_label.text }}</view
      >
    </view>
    <view class="button">
      <view class="login" @click="tipAgree">
        <button
          :style="buttonColor"
          :disabled="!noAgree"
          open-type="getPhoneNumber"
          hover-class="button-hover"
          @getphonenumber="getUserPhone"
        >
          {{ loginConfig.btn }}
        </button></view
      >
      <view class="agree">
        <view @click="changAgree">
          <checkbox class="checkbox" :checked="noAgree" />
        </view>
        <!-- <view class="agree_text">{{ loginConfig.agree_text }}</view> -->
        <rich-text
          class="agree_text"
          :nodes="loginConfig.agree_text"
          @click="agreenText"
        ></rich-text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { LoginService, type LoginModel } from '@/api/login'
import router from '@/router'
import { useConfigStore } from '@/stores/config'
import { useUserStore } from '@/stores/user'
import md5 from 'blueimp-md5'
import { ref, onBeforeMount, onMounted } from 'vue'

const configStore = useConfigStore()
const userStore = useUserStore()
const noAgree = ref<boolean>(false)
const buttonColor = ref({
  backgroundColor: 'rgb(201, 199, 199)'
})
const loginConfig = ref<LoginModel.LoginConfig>({
  big_label: {
    text: '',
    font_size: '',
    is_bold: false,
    color: ''
  },
  small_label: {
    text: '',
    font_size: '',
    is_bold: false,
    color: ''
  }
} as LoginModel.LoginConfig)

const getConfig = async () => {
  const code = await login()
  if (code) {
    const result = await (await LoginService.byMiniappCode({ code: code })).data
    const cookie = result.data.cookie_data.key.split('*_*_*')
    configStore.$patch({
      queryParms: { uid: result.data.cookie_data.uid, iv: result.data.cookie_data.key },
      key: cookie[1]
    })

    const res = await (await LoginService.getLoingConfig({ code: code })).data
    loginConfig.value = res.data
    uni.setNavigationBarTitle({
      title: loginConfig.value.page_title
    })
  }
}
async function login() {
  return await uni
    .login({ provider: 'weixin' })
    .then((res) => {
      configStore.$patch({
        queryParms: { uid: res.code, iv: md5(res.code) },
        key: md5(md5(res.code))
      })
      return res.code
    })
    .catch((err) => {
      console.log(err)
    })
}
const getUserPhone = async (e: any) => {
  if (e.target.code) {
    const param = {
      wx_encryptedData: e.target.encryptedData,
      wx_iv: e.target.iv,
      wx_code: e.target.code
    } as LoginModel.UserPhone
    const phoneLogin = await (await LoginService.byMiniappPhone(param)).data
    if (phoneLogin.code == 0) {
      const pcookie = phoneLogin.data.cookie_data.key.split('*_*_*')
      configStore.$patch({
        queryParms: { uid: phoneLogin.data.cookie_data.uid, iv: phoneLogin.data.cookie_data.key },
        key: pcookie[1]
      })
      userStore.$patch({
        token: pcookie[1]
      })
      if (userStore.token) {
        console.log('conf', configStore.getQueryParms, configStore.key)
        console.log('token', userStore.token)
        setTimeout(() => {
          router.switchTab('index')
        }, 2000)
      }
    }
  }
}
const changAgree = () => {
  noAgree.value = !noAgree.value
  buttonColor.value.backgroundColor = noAgree.value ? '#2eb5f0' : 'rgb(201, 199, 199)'
}
const tipAgree = () => {
  !noAgree.value && uni.showToast({ title: loginConfig.value.no_agree_tip, icon: 'fail' })
}
const agreenText = (e: any) => {
  router.navigate('agreement', {})
}
onBeforeMount(async () => await getConfig())
onMounted(() => {
  if (userStore.token) {
    router.switchTab('index')
  }
})
</script>

<style lang="scss" scoped>
.login_main {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  .top {
    width: 60%;
    margin-top: 40rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;

    .img {
      height: 200rpx;
      width: 200rpx;
      image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .title {
      width: 100%;
      color: black;
      font-size: 64rpx;
      margin: 20rpx 0 20rpx 0;
      font-weight: bold;
      text-align: center;
    }
  }
  .button {
    width: 88%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40rpx;
    .login {
      width: 90%;
      margin-bottom: 60rpx;
    }
    .agree {
      width: 95%;
      // height: 20rpx;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      .checkbox {
        transform: scale(0.58);
        // border-style: #2eb5f0;
      }
      .agree_text {
        // flex: 1;

        font-size: 30rpx;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
