import * as LoginModel from './login.model'

import prequest from '@/utils/request'

class LoginService {
  static byMiniappCode(param: any) {
    return prequest.post('/wx/login/byMiniappCode', { params: param })
  }
  static getLoingConfig() {
    return prequest.post<LoginModel.LoginConfig>('/wx/baseinfo/login')
  }
}

export { LoginService, LoginModel }
