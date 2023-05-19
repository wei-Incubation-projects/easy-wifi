import type { DeepReadonly, UnwrapNestedRefs } from 'vue'
import pages from './pages'
import type { BackParams, CourseDetails } from './types'
// import uni from '@dcloudio/vite-plugin-uni'
type PageNames = keyof typeof pages

const routeStore = {} as Record<PageNames, unknown>

type ObjectType<T> = T extends 'courseDetails' ? CourseDetails : never
interface MyPageOptions {
  eventName?: string
}
// 获取路由参数
export function getRouteParams<T extends PageNames>(
  page: T
): DeepReadonly<UnwrapNestedRefs<ObjectType<T>>> {
  const p = routeStore[page] as ObjectType<T>
  return readonly<ObjectType<T>>(p)
}

// 处理多次点击
let navigateLock = false
// 路由转跳
function navigate<T extends PageNames>(page: T, params: ObjectType<T>): Promise<any> | undefined {
  if (navigateLock) return
  const eventName = Math.floor(Math.random() * 1000) + new Date().getTime() + '' // 生成唯一事件名
  navigateLock = true
  routeStore[page] = params
  uni.navigateTo({
    url: `${pages[page]}?eventName=${eventName}`,
    complete: () => (navigateLock = false)
  })
  return new Promise<any>((resolve, reject) => {
    uni.$once(eventName, resolve), uni.$once(eventName, reject)
  })
}
// 重定向
function redirect<T extends PageNames>(page: T, params?: ObjectType<T>) {
  routeStore[page] = params
  uni.redirectTo({ url: pages[page] })
}

function reLaunch<T extends PageNames>(page: T, params?: ObjectType<T>) {
  routeStore[page] = params
  uni.reLaunch({ url: pages[page] })
}
function switchTab<T extends PageNames>(page: T, params?: ObjectType<T>) {
  routeStore[page] = params
  uni.switchTab({ url: pages[page] })
}
function back({ delta, data }: BackParams = { delta: 1, data: null }) {
  const currentRoute = getCurrentPages().pop()
  const eventName = (currentRoute?.options as MyPageOptions).eventName || ''

  uni.$emit(eventName, data)
  uni.navigateBack({ delta })
}

export default { navigate, redirect, reLaunch, switchTab, back }
