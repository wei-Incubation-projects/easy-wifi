import type { ApiResp } from '../types'

export interface GetHomeDataResp extends ApiResp<HomeData> {
  data: HomeData
}

export interface HomeData {
  bottom_menu: Menu[]
  line1_label: LineLabel
  line2_label: LineLabel
  line3_label: LineLabel
  loop_pics: LoopPics
  other_icon: OtherIcon
  page_title: string
}
export interface Menu {
  icon: string
  label: string
  selected_icon: string
  template: string
}

export interface LineLabel {
  color: string
  font_size: number | string
  is_bold: boolean
  text: string
}
export interface LoopPics {
  height: number | string
  data: string[]
}
export interface OtherIcon {
  key: string
  wifi1: string
  wifi2: string
  wifi3: string
  wifi4: string
  wifiok: string
}

export interface WifiInfo {
  SSID: string
  BSSID: string
  secure: boolean
  signalStrength: number
  frequency: number
}
