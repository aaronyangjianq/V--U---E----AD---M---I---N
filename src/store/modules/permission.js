import { asyncRouterMap, constantRouterMap } from '@/router/config';

/**
 * 过滤账户是否拥有某一个权限，并将菜单从加载列表移除
 *
 * @param permission 权限设定值
 * @param route      路由
 * @returns {boolean}
 */
function hasPermission (permission, route) {
  if (route.meta && route.meta.permission) {
    let flag = false;
    for (let i = 0, len = permission.length; i < len; i++) {
      flag = route.meta.permission.includes(permission[i]);
      if (flag) {
        return true;
      }
    }
    return false;
  }
  return true;
}

/**
 * 单账户多角色时，使用该方法可过滤角色不存在的菜单
 *
 * @param roles
 * @param route
 * @returns {*}
 */
// eslint-disable-next-line
function hasRole(roles, route) {
  if (route.meta && route.meta.roles) {
    return route.meta.roles.includes(roles.id);
  } else {
    return true;
  }
}

/**
 * 根据权限表格式化生成可访问路由菜单
 * 
 * @param {*} routerMap 预设路由
 * @param {*} roles     用户权限设置表
 */
function filterAsyncRouter (routerMap, roles) {
  // 循环过滤不符合值
  const accessedRouters = routerMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        // 递归执行
        route.children = filterAsyncRouter(route.children, roles);
      }
      return true;
    }
    return false;
  });
  // 返回最终过滤值
  return accessedRouters;
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      state.routers = constantRouterMap.concat(routers);
    }
  },
  actions: {
    GenerateRoutes ({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data;
        const accessedRouters = filterAsyncRouter(asyncRouterMap, roles);
        commit('SET_ROUTERS', accessedRouters);
        resolve();
      });
    }
  }
};

export default permission;
