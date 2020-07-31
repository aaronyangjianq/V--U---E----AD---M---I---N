/*
 * API接口
 * @Author: Evan.Xu 
 * @Date: 2020-05-25 17:03:21 
 * @Last Modified by: Evan.Xu
 * @Last Modified time: 2020-06-12 13:54:59
 */
import http from '@/core/http';

/**
 * 说明：根据API文档封装接口
 * 请求方式：http.get(url, parameter) / http.post(url, parameter)
 * （special：url的配置 需与 代理的配置 一致）
 * 
 * eg:
 * 
 * // services 配置如下：
 * // 获取商店信息 
 * export const getCheck = (parameter) => {
 *  return http.get('/api/shop', parameter);
 * };
 * 
 * // 业务页面(如：App.vue、store/action、components/xxx.vue)里按需引用如下：
 * import { getCheck } from '@/services';
 * 
 * created () {
 *    getCheck({ user: 1 }).then(res => {}).catch(err => {})
 * }
 */

/**
 * 用户操作
 * @param {*} parameter
 */
// 登录接口
export function login (parameter) {
  return http.post(`/admin/login/login`, parameter);
}
// 登出接口
export function logout () {
  return http.post(`/admin/login/logout`);
}
// 修改用户密码
export function changeUserPassword (parameter) {
  return http.post(`/admin/admin/changePass`, parameter);
}
// 获取用户信息
export function getUserInfo () {
  return http.get(`/admin/user/myinfo`);
}
// --- 用户管理

// 用户列表
export function getUserList (parameter) {
  return http.get(`/admin/user/list`, parameter);
}

// 用户卡券
export function getUserCoupons (parameter) {
  return http.get(`/admin/user/coupons`, parameter);
}

// 打卡记录
export function getUserRecord (parameter) {
  return http.get(`/admin/user/record`, parameter);
}

// ---- 区域管理

// 区域信息
export function getAreaInfo (parameter) {
  return http.get(`/admin/area/info`, parameter);
}

// 修改区域
export function saveArea (parameter) {
  return http.post(`/admin/area/save`, parameter);
}

// --- 设置管理

// 兑换时长
export function settingCoupontime (parameter) {
  return http.get(`/admin/setting/coupontime`, parameter);
}

// 设置兑换时长
export function savCoupontime (parameter) {
  return http.post(`/admin/setting/savecoupontime`, parameter);
}

// 商家电话
export function settingPhone (parameter) {
  return http.get(`/admin/setting/phone`, parameter);
}

// 修改电话
export function savephone (parameter) {
  return http.post(`/admin/setting/savephone`, parameter);
} 


//  --- 轮播图

//  轮播图列表
export function getBannerInfo () {
  return http.get(`/admin/banner/list`);
}

//  上传图片
export function upload(parameter) {
  return http.post(`/admin/banner/upload`, parameter);
}

//  添加
export function addUpload(parameter) {
  return http.post(`/admin/banner/add`, parameter);
}

//  更换
export function changeUpload(parameter) {
  return http.post(`/admin/banner/update`, parameter);
}

//  删除
export function deleteUpload(parameter) {
  return http.post(`/admin/banner/del`, parameter);
}

// --- 充值价格配置

// 充值价格列表
export function getDepositList() {
  return http.get(`/admin/deposit/list`);
}

// 新增
export function addDeposit(parameter) {
  return http.post(`/admin/deposit/add`, parameter);
}

// 删除
export function delDeposit(parameter) {
  return http.post(`/admin/deposit/del`, parameter);
}

// 修改
export function saveDeposit(parameter) {
  return http.post(`/admin/deposit/save`, parameter);
}

// 充值记录列表 
export function getDepositRecordList(parameter) {
  return http.get(`/admin/deposit/order`, parameter);
}

// --- 大门管理

// 开门列表
export function openDoorList(parameter) {
  return http.get(`/admin/device/opendoorlist`, parameter);
}

// 点击开门
export function opendoor() {
  return http.get(`/admin/device/opendoor`);
}

// --- 卡券管理

// 卡券列表
export function getCouponList() {
  return http.get(`/admin/coupon/list`);
}

// 设置状态
export function setStatus(parameter) {
  return http.post(`/admin/coupon/setstatus`, parameter);
}

// 添加卡券
export function addCoupon(parameter) {
  return http.post(`/admin/coupon/add`, parameter);
}

// 修改保存
export function saveCoupon(parameter) {
  return http.post(`/admin/coupon/save`, parameter);
}

// 兑换码审核列表

export function codeverify(parameter) {
  return http.get(`/admin/coupon/codeverify`, parameter);
}

// 审核通过
export function passCoupon(parameter) {
  return http.post(`/admin/coupon/pass`, parameter);
}

// 审核不通过
export function nopassCoupon(parameter) {
  return http.post(`/admin/coupon/nopass`, parameter);
}

// 订单管理

export function getOrderList(parameter) {
  return http.get(`/admin/order/list`, parameter);
}

// 取消订单
export function cancelOrder(parameter) {
  return http.post(`/admin/order/refund`, parameter);
}

// 座位管理
export function getPlaceList(parameter) {
  return http.get(`/admin/place/list`, parameter);
}

// 座位电源开关
export function updateButton(parameter) {
  return http.post(`/admin/place/updateon`, parameter);
}

// 预约情况
export function placeSeat(parameter) {
  return http.post(`/admin/place/useinfo`, parameter);
}