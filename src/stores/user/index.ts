import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: '',
    token: ''
  }),
  persist: {
    key: 'store-key',
    storage: {
      setItem: uni.setStorageSync,
      getItem: uni.getStorageSync
    }
  },
  getters: {},
  actions: {
    async setUserInfo() {
      this.userInfo = ''
    }
  }
})
