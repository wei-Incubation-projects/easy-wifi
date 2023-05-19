import { LoginService, type LoginModel } from '@/api/login'
import { generateRandomString } from '@/utils/common'
import md5 from 'blueimp-md5'
import { defineStore } from 'pinia'

interface ConfigState {
  loginConfig: LoginModel.LoginConfig
  queryParms: CommonParam
}

export const useConfigStore = defineStore('config', {
  state: (): ConfigState => ({
    loginConfig: {} as LoginModel.LoginConfig,
    queryParms: {
      sign_type: 'MD5',
      sys_hash: import.meta.env.VITE_SYS_HASH,
      env: import.meta.env.VITE_ENV,
      uid: 'loginBaseinfo',
      code: 'loginBaseinfo'
    } as CommonParam
  }),
  persist: {
    key: 'config-key',
    storage: {
      setItem: uni.setStorageSync,
      getItem: uni.getStorageSync
    }
  },
  getters: {
    getQueryParms(): CommonParam {
      this.queryParms.nonce_str = generateRandomString(32)
      return this.queryParms
    },
    async getLoginConfig(): Promise<LoginModel.LoginConfig> {
      this.loginConfig = (await LoginService.getLoingConfig()).data
      return this.loginConfig
    }
  },
  actions: {
    async setLoginConfigInfo() {
      //   this.loginConfig = ''
    }
  }
})
