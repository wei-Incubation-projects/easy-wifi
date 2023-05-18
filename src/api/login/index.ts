import * as LoginModel from './login.model'

import prequest from '@/utils/request'

class LoginService {
  static getLoingConfig() {
    return prequest.post<LoginModel.GetLoninConfigResp>('/wx/baseinfo/login')
  }
}

export { LoginService, LoginModel }
