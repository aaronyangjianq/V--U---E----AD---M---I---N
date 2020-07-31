/**
 * permission 鉴权功能
 */
import Vue from 'vue';
import router from './router';
import store from './store';

import config from 'config';
import { setDocumentTitle, domTitle } from '@/core/utils/domUtil';
import { ACCESS_TOKEN } from '@/store/mutation-types';

const whiteList = ['login']; // no redirect whitelist
const defaultRoutePath = config.defaultRoutePath; // 默认跳转地址

router.beforeEach((to, from, next) => {
  // console.log('router', 'to:', to, 'from:', from);
  to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${to.meta.title} - ${domTitle}`));
  // 获取token值做判断
  if (Vue.ls.get(ACCESS_TOKEN)) {
    /* has token */
    // 当token存在时直接访问登录页，重定向到默认定向页
    if (to.path === '/user/login') {
      next({ path: defaultRoutePath });
    } else {
      // (当前页面刷新时)加载用户权限设置
      if (store.state.user.roles.length === 0) {
        // 设置vuex并获取路由权限
        store.dispatch('GetInfo').then((res) => {
          const roles = res.result;
          // 设置路由权限并添加路由
          store.dispatch('GenerateRoutes', { roles }).then(() => {
            // 根据roles权限生成可访问的路由表
            router.addRoutes(store.state.permission.addRouters);
            const redirect = decodeURIComponent(from.query.redirect || to.path);
            if (to.path === redirect) {
              // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
              next({ ...to, replace: true });
            } else {
              // 跳转到目的路由
              next({ path: redirect });
            }
          });
        });
      } else {
        next();
      }
    }
  } else {
    /* not token */
    if (whiteList.includes(to.name)) {
      // 在免登录白名单，直接进入
      next();
    } else {
      // 设置跳转登录页，并带入当前url
      next({ path: '/user/login', query: { redirect: to.fullPath } });
    }
  }
});
