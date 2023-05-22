import type { ApiResp } from '../types'

export interface GetHomeDataResp extends ApiResp<HomeData> {
  data: HomeData
}

export interface HomeData {
  bottom_menu: Menu[]
  loop_pics: {
    height: number | string
    data: string[]
  }
}
export interface Menu {
  icon: string
  label: string
  template: string
}
