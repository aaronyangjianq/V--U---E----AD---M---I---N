// ie polyfill
import '@babel/polyfill';

import Vue from 'vue';
import App from './App.vue';
// vue-router
import router from './router';
// vuex
import store from './store';
// vue-ls
import config from 'config';
import VueStorage from 'vue-ls';
Vue.use(VueStorage, config.storageOptions);

/**
 * moment.js 语言包
 * 默认语言：en
 * 默认方式：2
 * 
 * 1.[全部引入]：在 vue.config.js 中注释 webpack.ContextReplacementPlugin 和 webpack.IgnorePlugin 即可。
 * 
 * 2.[按需引入](优化打包体积)：在 vue.config.js 中配置 webpack.IgnorePlugin 打包过滤所有语言包。
 */
// [按需引入] moment语言包: zh-cn 中文
import 'moment/locale/zh-cn';

/**
 * antd组件 
 * 默认方式：2.2
 * 
 * 1.[全量引入]
 * 
 * 2.[按需引入](优化打包体积) 组件参考列表：https://github.com/vueComponent/ant-design-vue/blob/master/components/index.js
 *    2.1 手动引入：在各个组件引入所需antd组件
 *      (eg:)
 *        import DatePicker from 'ant-design-vue/lib/date-picker'; // 加载 JS
 *        import 'ant-design-vue/lib/date-picker/style/css';      // 加载 CSS
 *        import 'ant-design-vue/lib/date-picker/style';         // 加载 LESS
 *    2.2 按需引入：在 babel.config.js 中配置 babel-plugin-import，并在main.js中从ant-desgin-vue中引入模块，无需单独引入样式，即可等同于 手动引入 方式。
 */

// 1.[全量引入]
// import Antd from 'ant-design-vue'
// import 'ant-desgin-vue/dist/antd.css'
// Vue.use(Antd)

// 2.[按需引入]
import { 
  ConfigProvider, 
  Icon, 
  Layout, 
  Row, 
  Col, 
  Drawer, 
  Dropdown, 
  Menu, 
  Breadcrumb, 
  Tabs, 
  Input, 
  Button, 
  Form, 
  Modal, 
  Descriptions, 
  DatePicker, 
  TimePicker, 
  Table, 
  Divider, 
  Select,
  Upload, 
  notification, 
  message
} from 'ant-design-vue';
/* v1.1.3+ registration methods */
Vue.use(ConfigProvider);
Vue.use(Icon);
Vue.use(Layout);
Vue.use(Row);
Vue.use(Col);
Vue.use(Drawer);
Vue.use(Dropdown);
Vue.use(Menu);
Vue.use(Breadcrumb);
Vue.use(Tabs);
Vue.use(Input);
Vue.use(Button);
Vue.use(Form);
Vue.use(Modal);
Vue.use(Descriptions);
Vue.use(DatePicker);
Vue.use(Table);
Vue.use(Divider);
Vue.use(Select);
Vue.use(TimePicker);
Vue.use(Upload);
notification.config({
  duration: 3,
});
Vue.prototype.$notification = notification;
Vue.prototype.$message = message;

// 初始化storage值
import bootstrap from './core/bootstrap';
// 引入 权限验证 路由
import './permission';

// 全局样式表
import './assets/global.less';

Vue.config.productionTip = false;

const vue = new Vue({
  router,
  store,
  created () {
    bootstrap();
  },
  render: h => h(App),
}).$mount('#app');

export {
  vue as VM
};
