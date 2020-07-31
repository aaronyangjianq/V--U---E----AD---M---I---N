/*
 * utils 通用方法库
 * @Author: Evan.Xu 
 * @Date: 2020-05-25 18:13:24 
 * @Last Modified by: Evan.Xu
 * @Last Modified time: 2020-07-31 02:19:02
 */

/**
 * 说明：配置项目所需通用（js对象操作、js数组操作）方法
 * 
 * eg：
 * 
 * // utils 配置如下：
 * // 分类信息递归赋值
 * export function typeRecursive (data) {
 *  return data.map(x => {
 *    if (x.children.length !== 0) {
 *      typeRecursive(x.children);
 *    }
 *    return x;
 *  })
 * }
 * 
 * // 业务页面(如：App.vue、store/action、components/xxx.vue)里按需引用如下：
 * import { typeRecursive } from '@/core/utils';
 * 
 * let a = typeRecursive(data);
 * 
 */

/**
 * 权限值 递归赋值
 */
export function permsRecursive (data) {
  let arr = [];
  data.map(x => {
    arr.push(x.uri);
    // 子层级判断
    if (x.children.length !== 0) {
      arr = arr.concat(permsRecursive(x.children));
    }
  });
  return arr;
}

/**
 * 分类信息递归赋值
 */
export function typeRecursive (data) {
  return data.map(x => {
    // 子层级判断
    if (x.children.length !== 0) { 
      typeRecursive(x.children);
      // 父层级插入
      x.children.unshift({
        id: x.id,
        label: '全部',
        pid: x.pid,
        value: x.id,
        children: [],
      });
    }
    // 父层返回数据
    return x;
  });
}
/**
 * 时间格式化
 */
export function dateFormatter(date, fmt) {
  var o = {
      'M+': date.getMonth() + 1, //月份
      'd+': date.getDate(), //日
      'H+': date.getHours(), //小时
      'm+': date.getMinutes(), //分
      's+': date.getSeconds(), //秒
      'q+': Math.floor((date.getMonth() + 3) / 3), //季度
      'S': date.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  for (var k in o)
      if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
  return fmt;
}