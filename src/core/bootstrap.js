/*
 * vuex-storage 配置渲染
 * @Author: Evan.Xu 
 * @Date: 2020-06-03 16:58:50 
 * @Last Modified by: Evan.Xu
 * @Last Modified time: 2020-06-04 15:47:06
 */
import Vue from 'vue';
import store from '@/store';
import {
  TOGGLE_LAYOUT,
  TOGGLE_NAV_THEME,
  TOGGLE_CONTENT_WIDTH,
  TOGGLE_FIXED_SIDEBAR,
  TOGGLE_FIXED_HEADER,
  TOGGLE_MULTI_TAB,
} from '@/store/mutation-types';
import config from 'config';

export default function Initializer () {
  store.commit(TOGGLE_LAYOUT, Vue.ls.get(TOGGLE_LAYOUT, config.layout));
  store.commit(TOGGLE_NAV_THEME, Vue.ls.get(TOGGLE_NAV_THEME, config.navTheme));
  store.commit(TOGGLE_CONTENT_WIDTH, Vue.ls.get(TOGGLE_CONTENT_WIDTH, config.contentWidth));
  store.commit(TOGGLE_FIXED_SIDEBAR, Vue.ls.get(TOGGLE_FIXED_SIDEBAR, config.fixSidebar));
  store.commit(TOGGLE_FIXED_HEADER, Vue.ls.get(TOGGLE_FIXED_HEADER, config.fixHeader));
  store.commit(TOGGLE_MULTI_TAB, Vue.ls.get(TOGGLE_MULTI_TAB, config.multiTab));
}
