import * as UserModel from './user.model'

import prequest from '@/utils/request'

class UserService {
  static getList(params: UserModel.GetUserListParm) {
    return prequest.post<UserModel.GetUserListResp>('/list', { params })
  }
}

export default {
  UserService,
  UserModel
}
