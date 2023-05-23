import * as LoginModel from './login.model'

import prequest from '@/utils/request'

class LoginService {
  static byMiniappCode(param: any) {
    return prequest.post<Promise<LoginModel.GetMiniappCodeResp>>('/wx/login/byMiniappCode', {
      data: param
    })
  }
  static getLoingConfig(param: any) {
    return prequest.post<Promise<LoginModel.GetLoninConfigResp>>('/wx/baseinfo/login', {
      data: param
    })
  }
  static byMiniappPhone(param: LoginModel.UserPhone) {
    return prequest.post<Promise<LoginModel.GetPhoneLoginResp>>('/wx/login/byMiniappPhone', {
      data: param
    })
  }
}

export { LoginService, LoginModel }
