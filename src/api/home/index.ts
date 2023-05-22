import prequest from '@/utils/request'
import * as HomeModel from './home.model'

class HomeService {
  static getWifiIndex() {
    return prequest.post<Promise<HomeModel.GetHomeDataResp>>('/wx/baseinfo/wifiIndex')
  }
}

export { HomeService, HomeModel }
