import Lock from '@prequest/lock'
import md5 from 'blueimp-md5'
import { PreQuest, create } from '@prequest/miniprogram'
import type { MiddlewareCallback } from '@prequest/types'
import { useUserStore } from '@/stores/user'
import { useConfigStore } from '@/stores/config'
import type { ApiResp } from '@/api/types'
import { generateParamSign } from './common'
import router from '@/router'

const userStore = useUserStore()
const configStore = useConfigStore()

declare module '@prequest/types' {
  interface PQRequest {
    skipTokenCheck: boolean
  }
}

PreQuest.defaults.baseURL = import.meta.env.VITE_APP_URL
PreQuest.defaults.header = {
  'Content-Type': 'application/json'
}

const prequest = create(uni.request)

const lock = new Lock({
  getValue() {
    return Promise.resolve(userStore.token)
  },
  setValue(token) {
    userStore.token = token
  },
  clearValue() {
    userStore.token = ''
  }
})
const wrapper = Lock.createLockWrapper(lock)

// 设置通用参数
const requestSetParam: MiddlewareCallback = async (ctx, next) => {
  const commonParms = configStore.getQueryParms
  const params = Object.assign({}, ctx.request.params, commonParms)
  console.log('-------------------')
  console.log('requestPath', ctx.request.path)
  console.log('params', params)
  const np = generateParamSign(params, configStore.key)
  console.log('签名对象: ', np)
  params.sign = md5(np).toUpperCase()
  console.log('sign', params.sign)
  ctx.request.data = params
  await next()
}

const refreshToken: MiddlewareCallback = async (ctx, next) => {
  if (ctx.request.skipTokenCheck) return next()

  const token = await wrapper(
    () =>
      new Promise((resolve) => {
        uni.login({
          async success(res) {
            if (res.code) {
              prequest('/login', {
                method: 'post',
                skipTokenCheck: true,
                data: { code: res.code }
              }).then((res1) => resolve(res1.data.data.token))
            }
          }
        })
      })
  )
  if (ctx.request.header) {
    ctx.request.header['Authorization'] = `Bearer ${token}`
  }
  await next()
}

const responeParse: MiddlewareCallback = async (ctx, next) => {
  await next()
  const { statusCode, data } = ctx.response
  if (![200, 301, 302].includes(statusCode)) {
    throw new Error(`${statusCode}`)
  }
  const result: ApiResp<any> = data
  if (result.data?.is_tip) {
    uni.showToast({ title: result.msg, icon: 'fail' })
  }
  if (result.code == 777) {
    // uni.showToast({ title: result.msg, icon: 'fail' })
    userStore.$reset()
    configStore.$reset()
    router.reLaunch('login')
  }
}

// prequest.use(refreshToken).use(parse)
prequest.use(requestSetParam).use(responeParse)

export default prequest
