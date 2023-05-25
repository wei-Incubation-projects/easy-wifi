export interface ApiResp<T> {
  code: number | string
  msg: string
  data:
    | {
        is_tip?: boolean
      }
    | T
}

export interface WifiParam {
  SSID: string
  password: string
}
