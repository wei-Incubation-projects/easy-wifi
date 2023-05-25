import type { HomeModel } from '@/api/home'
import type { WifiParam } from '@/api/types'

const useWifiHook = () => {
  const connWifi = ref<HomeModel.WifiInfo>()
  const wifiList = ref<Array<HomeModel.WifiInfo>>([
    {
      SSID: 'sfsa',
      BSSID: 'adfas',
      secure: true,
      signalStrength: 100,
      frequency: 60
    }
  ])
  const getConnWifi = async () => {
    const conn = await uni.getConnectedWifi()
    connWifi.value = conn.wifi
  }

  const getWifiList = async () => {
    await uni.startWifi()
    uni.getWifiList({
      success: (res) => {
        uni.onGetWifiList((wifi) => {
          wifiList.value = wifi.wifiList
          console.log('监听到：', wifi.wifiList)
        })
      },
      fail: (err) => {
        console.log('getlist', err)
        uni.showToast({ title: '获取wifi列表失败', icon: 'fail' })
      }
    })
  }

  const doConnWifi = async ({ SSID, password }: WifiParam) => {
    const connRes = await uni.connectWifi({
      SSID: SSID,
      password: password
    })
    if (connRes.errCode == 0) {
      getConnWifi()
      uni.showToast({ title: 'wifi连接成功!', icon: 'success' })
    } else {
      uni.showToast({ title: connRes.errMsg, icon: 'fail' })
    }
    return
  }

  onReady(async () => {
    const sysInfo = uni.getSystemInfoSync()
    console.log('sysinfo', sysInfo)
    if (!sysInfo.wifiEnabled) {
      const wifiState = await uni.startWifi()
      if (wifiState.errCode !== 0) {
        uni.showToast({ title: wifiState.errMsg, icon: 'error' })
        await uni.getSetting({
          success(res) {
            if (!res.authSetting['scope.userLocation']) {
              uni.authorize({
                scope: 'scope.userLocation',
                success: () => {
                  // uni.startWifi({ fail: () => uni.showToast({ title: 'wifi启动失败', icon: 'fail' }) })
                  uni.startWifi({ fail: (e) => console.log('start', e) })
                },
                fail: () => {
                  uni.showToast({ title: '请开启wifi授权', icon: 'fail' })
                }
              })
            }
          },
          fail() {
            uni.showToast({ title: '获取wifi权限失败,请检查', icon: 'fail' })
          }
        })
      }
    }
    await getWifiList()
  })
  return { doConnWifi, connWifi, wifiList }
}

export default useWifiHook
