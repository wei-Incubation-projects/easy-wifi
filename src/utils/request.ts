import { PreQuest, create } from '@prequest/miniprogram'
import Lock from '@prequest/lock'
import type { MiddlewareCallback } from '@prequest/types'
import { useUserStore } from '@/stores/user'

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

prequest.use(refreshToken).use(parse)

export default prequest
