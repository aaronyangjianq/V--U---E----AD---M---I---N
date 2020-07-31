/*
 * 项目默认配置项
 * @Author: Evan.Xu 
 * @Date: 2020-05-20 14:05:27 
 * @Last Modified by: Evan.Xu
 * @Last Modified time: 2020-07-31 00:20:02
 */
const config = {
  // development server port 8000
  port: 8000,
  // nav menu position: sidemenu or topmenu
  layout: 'sidemenu',
  // theme for nav menu: light or dark
  navTheme: 'dark',
  // layout of content: Fixed or Fluid
  contentWidth: 'Fixed',
  // sticky sidebar
  fixSidebar: false,
  // sticky header
  fixHeader: false,
  // layout of tabs: true or false 默认不开启
  multiTab: false,
  // 正式环境
  production: process.env.NODE_ENV === 'production' && process.env.VUE_APP_PREVIEW !== 'true',
  // 预览环境
  preview: process.env.NODE_ENV === 'production' && process.env.VUE_APP_PREVIEW === 'true',
  // 测试环境
  development: process.env.NODE_ENV === 'development',
  // vue-ls options 缓存配置
  storageOptions: {
    namespace: process.env.NODE_ENV === 'production' && process.env.VUE_APP_PREVIEW !== 'true' ? 'WEADMIN__' : 'WEADMIN_dev__',
    name: 'ls',
    storage: 'local'
  },
  // 项目请求地址
  apihost: process.env.NODE_ENV === 'production' && process.env.VUE_APP_PREVIEW !== 'true' ? 'http://admin.wuer.3cxz.com' : 'http://admin.dev.3cxz.com',
  // 标题
  logoTitle: process.env.NODE_ENV === 'production' && process.env.VUE_APP_PREVIEW !== 'true' ? '無二研習社' : '[测试]無二研習社',
  // 默认跳转Route
  defaultRoutePath: '/users',
};

module.exports = config;
