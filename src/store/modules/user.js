import Vue from 'vue';
import {
  login,
  logout,
  getUserInfo,
} from '@/services';
import { permsRecursive } from '@/core/utils';
import { ACCESS_TOKEN } from '@/store/mutation-types';

const user = {
  state: {
    name: '',
    mobile: '',
    roles: [],
  },

  mutations: {
    SET_INFO: (state, { name, mobile }) => {
      state.name = name;
      state.mobile = mobile;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo)
          .then((response) => {
            if (response.code === 100) {
              const result = response.result;
              // 站点整合后，token值作为判断是否登录依据
              Vue.ls.set(ACCESS_TOKEN, result.token);
              resolve();
            } else {
              reject(response);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    // 获取用户信息
    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo().then(response => {
          if (response.code === 100) {
            // 用户数据
            const { nick, phone, email, group, menu_list } = response.result;

            // 设置用户权限列表
            const permissionList = ['user'];

            // 根据用户权限设置可访问路由菜单
            if (permissionList.length > 0) {
              
              // 设置VUEX
              commit('SET_INFO', {
                name: nick,
                mobile: phone,
              });
              commit('SET_ROLES', permissionList);
            } else {
              reject(new Error('getInfo: roles must be a non-null array !'));
            }

            // 返回参数
            resolve({
              result: permissionList,
            });
          } else if (response.code === 110) {
            Vue.ls.remove(ACCESS_TOKEN);
          } else {
            this.$notification.error({
              message: response.msg,
            });
          }
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 登出
    Logout({ commit }) {
      return new Promise((resolve) => {
        // 退出请求
        logout()
          .then(() => {
            resolve();
          })
          .catch(() => {
            resolve();
          });
        // 清空缓存
        Vue.ls.remove(ACCESS_TOKEN);
        // 清空store
        commit('SET_INFO', {
          name: '',
          mobile: '',
        });
        commit('SET_ROLES', []);
      });
    },
  },
};

export default user;
