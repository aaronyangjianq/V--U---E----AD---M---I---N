/*
 * 请求封装
 * @Author: Evan.Xu 
 * @Date: 2020-05-25 16:58:04 
 * @Last Modified by: Evan.Xu
 * @Last Modified time: 2020-05-25 17:25:22
 */

import request from './request';

// POST请求
const post = (url, data = {}) => {
  return request({
    method: 'post',
    url: url,
    data: data,
    // 请求预处理函数 可以把你传的param进行处理
    transformRequest: [
      (data) => {
        // data 就是post请求传的值
        let params = '';
        for (var index in data) {
          params += index + '=' + data[index] + '&';
        }
        // 判断最后一个字符串是否为&，为真则删除最后一个字符串
        if (params.charAt(params.length - 1) === '&') {
          params = params.substring(0, params.length - 1);
          return params;
        } else {
          return params;
        }
      },
    ],
  });
};

// GET请求
const get = (url, data = {}) => {
  return request({
    method: 'get',
    url: url,
    params: data,
  });
};

export default {
  post,
  get,
};