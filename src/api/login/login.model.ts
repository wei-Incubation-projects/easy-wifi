import type { ApiResp } from '../types'

export interface GetMiniappCodeResp extends ApiResp<CookieData> {
  data: CookieData
}

export interface CookieData {
  cookie_data: {
    key: string
    uid: string
  }
  is_tip: boolean
}
export interface GetLoninConfigResp extends ApiResp<LoginConfig> {
  data: LoginConfig
}

export interface LoginConfig {
  page_title: string
  logo: string
  big_label: {
    text: string
    font_size: number | string
    is_bold: false
    color: string
  }
  small_label: {
    text: string
    font_size: number | string
    is_bold: false
    color: string
  }
  no_agree_tip: string
  btn: string
  tb_ico: string
  agree_text: string
}

export interface UserPhone {
  wx_encryptedData: string
  wx_iv: string
  wx_code: string
}

export interface GetPhoneLoginResp extends ApiResp<CookieData> {
  data: CookieData
}
