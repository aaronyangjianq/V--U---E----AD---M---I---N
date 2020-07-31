import Vue from 'vue';
import Vuex from 'vuex';

import app from './modules/app';
import user from './modules/user';
import users from './modules/users';
import permission from './modules/permission';
import area from './modules/area';
import setValue from './modules/setValue';
import banner from './modules/banner';
import door from './modules/door';
import deposit from './modules/deposit';
import coupon from './modules/coupon';
import order from './modules/order';
import place from './modules/place';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app,
    area,
    coupon,
    user,
    users,
    setValue,
    banner,
    door,
    order,
    deposit,
    place,
    permission
  },
  state: {

  },
  mutations: {

  },
  actions: {

  },
});
