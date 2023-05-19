const mainPackage = {
  index: '/pages/index/index',
  login: '/pages/login/login'
}

const subPackage = {
  subIndex: '/package-sub/pages/index/index'
}

const pages = {
  ...mainPackage,
  ...subPackage
}

export default pages
