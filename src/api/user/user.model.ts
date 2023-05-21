import type { ApiResp } from '../types'

export interface GetUserListParm {
  position: number
}

export interface GetUserListData {
  name: string
  position: number
}

export interface GetUserListResp extends ApiResp<GetUserListData[]> {
  data: GetUserListData[]
}
