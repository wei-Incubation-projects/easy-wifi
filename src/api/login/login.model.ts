import type { ApiResp } from '../types'

export interface GetLoninConfigResp extends ApiResp {
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
