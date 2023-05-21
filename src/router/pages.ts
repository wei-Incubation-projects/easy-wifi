const mainPackage = {
  index: '/pages/index/index',
  discover: '/pages/discover/discover',
  mine: '/pages/mine/mine',
  login: '/pages/login/login',
  agreement: '/pages/agreement/agreement'
}

const subPackage = {
  subIndex: '/package-sub/pages/index/index'
}

const pages = {
  ...mainPackage,
  ...subPackage
}

export default pages
