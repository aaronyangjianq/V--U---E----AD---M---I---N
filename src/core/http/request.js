/*
 * 请求封装库
 * @Author: Evan.Xu 
 * @Date: 2020-05-25 16:18:30 
 * @Last Modified by: Evan.Xu
 * @Last Modified time: 2020-05-29 15:56:07
 */
import Vue from 'vue';
import axios from 'axios';
import store from '@/store';
import { VM } from '@/main';
import { ACCESS_TOKEN } from '../../store/mutation-types';

// 创建axios实例
const service = axios.create({
  timeout: 1000 * 6 // 请求超时时间
});

// 错误信息整合
const err = (error) => {
  // 不同错误情况做不同提示与操作
  if (error.response) {
    // console.log('error', error.response);
    const _err = error.response;
    const token = Vue.ls.get(ACCESS_TOKEN);
    // 判断状态 error.response.status（如：403、401、未登录 等）
    if (_err.status === 403) {
      VM.$notification.error({
        message: 'Forbidden',
        description: _err.data.message,
      });
    }
    if (_err.status === 401) {
      VM.$notification.error({
        message: 'Unauthorized',
        description: 'Authorization verification failed',
      });
      if (token) {
        store
          .dispatch('Logout')
          .then(() => {
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          })
          .catch((err) => {
            console.log(`接口请求异常：${err}`);
          });
      }
    }
  }
  return Promise.reject(error);
};

// 配置header
// service.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
// service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// service.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';

// 设置token
// service.interceptors.request.use(config => {
//   // 获取token
//   const token = Vue.ls.get(ACCESS_TOKEN);
//   if (token) {
//     config.headers['token'] = token; // 让每个请求携带自定义 token 请根据实际情况自行修改
//   }
//   return config;
// }, err);

// request interceptor
service.interceptors.response.use((response) => {
  // 判断状态 response.data.code（如：201 等）做鉴权操作
  // console.log('request', response.data);
  // token失效 | 未登录 ｜ 无权限
  if (response.data.code === 1016 || response.data.code === 1007 || response.data.code === 1003) {
    Vue.ls.remove(ACCESS_TOKEN);
    VM.$notification.error({
      message: 'Token error',
      description: response.data.msg,
    });
    VM.$router.push({ path: '/user/login' });
  }
  return response.data;
}, err);

export default service;