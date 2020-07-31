import Vue from 'vue';
import {
  TOGGLE_SIDEBAR,
  TOGGLE_LAYOUT,
  TOGGLE_NAV_THEME,
  TOGGLE_CONTENT_WIDTH,
  TOGGLE_FIXED_SIDEBAR,
  TOGGLE_FIXED_HEADER,
  TOGGLE_MULTI_TAB,
} from '@/store/mutation-types';

const app = {
  state: {
    device: 'desktop', // 当前设备值
    sidebar: false, // 侧边栏 true or false
    layout: 'sidemenu', // 侧边栏布局 sidemenu or topmenu
    theme: 'light', // nav菜单主题 light or dark
    contentWidth: 'Fixed', // 内容布局 Fixed or Fluid
    fixSidebar: false, // 固定左侧菜单栏 true or false
    fixHeader: false, // 固定Header true or false
    multiTab: false, // tabs标签 true or fasle
  },
  mutations: {
    TOGGLE_DEVICE: (state, device) => {
      state.device = device;
    },
    [TOGGLE_SIDEBAR]: (state, bool) => {
      Vue.ls.set(TOGGLE_SIDEBAR, bool);
      state.sidebar = bool;
    },
    [TOGGLE_LAYOUT]: (state, mode) => {
      Vue.ls.set(TOGGLE_LAYOUT, mode);
      state.layout = mode;
    },
    [TOGGLE_NAV_THEME]: (state, theme) => {
      Vue.ls.set(TOGGLE_NAV_THEME, theme);
      state.theme = theme;
    },
    [TOGGLE_CONTENT_WIDTH]: (state, type) => {
      Vue.ls.set(TOGGLE_CONTENT_WIDTH, type);
      state.contentWidth = type;
    },
    [TOGGLE_FIXED_SIDEBAR]: (state, bool) => {
      Vue.ls.set(TOGGLE_FIXED_SIDEBAR, bool);
      state.fixSidebar = bool;
    },
    [TOGGLE_FIXED_HEADER]: (state, bool) => {
      Vue.ls.set(TOGGLE_FIXED_HEADER, bool);
      state.fixHeader = bool;
    },
    [TOGGLE_MULTI_TAB]: (state, bool) => {
      Vue.ls.set(TOGGLE_MULTI_TAB, bool);
      state.multiTab = bool;
    },
  },
  actions: {
    setSidebar({ commit }, data) {
      commit(TOGGLE_SIDEBAR, data);
    },
  },
};

export default app;
