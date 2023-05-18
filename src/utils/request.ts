import Lock from '@prequest/lock'
import md5 from 'blueimp-md5'
import { PreQuest, create } from '@prequest/miniprogram'
import type { MiddlewareCallback } from '@prequest/types'
import { useUserStore } from '@/stores/user'
import { generateRandomString } from './common'

const userStore = useUserStore()

declare module '@prequest/types' {
  interface PQRequest {
    skipTokenCheck: boolean
  }
}

PreQuest.defaults.baseURL = import.meta.env.VITE_APP_URL
PreQuest.defaults.header = {}

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
const requestSetParam: MiddlewareCallback = async (ctx, next) => {
  const commonParam: CommonParam = {
    nonce_str: generateRandomString(16),
    sign_type: 'MD5',
    sys_hash: 'eccbc87e4b5ce2fe328308fd9f2a7baf3',
    env: 'test',
    uid: 'eccbc87e4b5ce2fe328308fd9f2a7baf3',
    iv: md5('eccbc87e4b5ce2fe328308fd9f2a7baf3')
  }
  const params = Object.assign({ ...ctx.request.params }, commonParam)
  params.sign = md5(JSON.stringify(params))
  console.log(params)
  ctx.request.params = params
  next()
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

const parse: MiddlewareCallback = async (ctx, next) => {
  await next()
  const { statusCode } = ctx.response
  if (![200, 301, 302].includes(statusCode)) {
    throw new Error(`${statusCode}`)
  }
}

// prequest.use(refreshToken).use(parse)
prequest.use(requestSetParam)

export default prequest
