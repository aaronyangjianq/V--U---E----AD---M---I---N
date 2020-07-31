import Vue from 'vue';
import Router from 'vue-router';
import { constantRouterMap, asyncRouterMap } from './config';

// fixed Vue-Router 正常报错 begin.
const routerPush = Router.prototype.push;
Router.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error);
};
// fixed end.

Vue.use(Router);

// 权限验证 路由
const permisRouter = {
  mode: 'hash',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap,
};

// 非权限验证 路由
const staticRouter = {
  mode: 'hash',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap.concat(asyncRouterMap),
};

export default new Router(staticRouter);
