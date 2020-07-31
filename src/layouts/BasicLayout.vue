<template>
  <a-layout :class="['layout', device]">
    <!-- SideMenu -->
    <!-- 移动端菜单栏 -->
    <a-drawer
      v-if="isMobile()"
      placement="left"
      :wrapClassName="`drawer-sider ${navTheme}`"
      :closable="false"
      :visible="collapsed"
      @close="drawerClose"
    >
      <side-menu
        mode="inline"
        :menus="menus"
        :theme="navTheme"
        :collapsed="false"
        :collapsible="true"
      ></side-menu>
    </a-drawer>
    <!-- PC端菜单栏 -->
    <side-menu
      v-else-if="isSideMenu()"
      mode="inline"
      :menus="menus"
      :theme="navTheme"
      :collapsed="collapsed"
      :collapsible="true"
    ></side-menu>

    <a-layout :class="[layoutMode, `content-width-${contentWidth}`]" :style="{ paddingLeft: contentPaddingLeft, minHeight: '100vh' }">
      <!-- layout header -->
      <global-header
        :mode="layoutMode"
        :menus="menus"
        :theme="navTheme"
        :collapsed="collapsed"
        :device="device"
        @toggle="toggle"
      />

      <!-- layout content -->
      <a-layout-content :style="{ height: '100%', margin: '24px 24px 0', paddingTop: fixHeader ? '64px' : '0' }">
        <!-- 多标签tabs -->
        <multi-tab v-if="multiTab"></multi-tab>
        <transition name="page-transition">
          <route-view />
        </transition>
      </a-layout-content>

      <!-- layout footer -->
      <a-layout-footer>
        <global-footer />
      </a-layout-footer>

    </a-layout>
  </a-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { mixin, mixinDevice } from '@/core/utils/mixin';

// layouts/library 组件
import RouteView from './RouteView';
import MultiTab from '@/library/MultiTab';
import SideMenu from '@/library/Menu/SideMenu';
import GlobalHeader from '@/library/GlobalHeader';
import GlobalFooter from '@/library/GlobalFooter';

// 非权限验证 路由
import { asyncRouterMap } from '@/router/config';

export default {
  name: 'BasicLayout',
  mixins: [mixin, mixinDevice],
  components: {
    RouteView,
    MultiTab,
    SideMenu,
    GlobalHeader,
    GlobalFooter,
  },
  data () {
    return {
      collapsed: false,
      menus: [],
    };
  },
  computed: {
    ...mapState({
      // 动态主路由
      mainMenu: state => state.permission.addRouters,
    }),
    contentPaddingLeft () {
      if (!this.fixSidebar || this.isMobile()) {
        return '0';
      }
      if (this.sidebarOpened) {
        return '256px';
      }
      return '80px';
    },
  },
  watch: {
    sidebarOpened (val) {
      this.collapsed = !val;
    },
  },
  created () {
    // console.log('BasicLayout初始化');
    
    // 配置 权限验证 路由
    // this.menus = this.mainMenu.find(item => item.path === '/').children;

    // 配置 非权限验证 路由
    this.menus = asyncRouterMap.find(item => item.path === '/').children;

    this.collapsed = !this.sidebarOpened;
  },
  mounted () {
    const userAgent = navigator.userAgent;
    if (userAgent.indexOf('Edge') > -1) {
      this.$nextTick(() => {
        this.collapsed = !this.collapsed;
        setTimeout(() => {
          this.collapsed = !this.collapsed;
        }, 16);
      });
    }
  },
  methods: {
    ...mapActions(['setSidebar']),
    toggle () {
      this.collapsed = !this.collapsed;
      this.setSidebar(!this.collapsed);
    },
    drawerClose () {
      this.collapsed = false;
    }
  }
};
</script>

<style lang="less">

/*
 * The following styles are auto-applied to elements with
 * transition="page-transition" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the page transition by editing
 * these styles.
 */

.page-transition-enter {
  opacity: 0;
}

.page-transition-leave-active {
  opacity: 0;
}

.page-transition-enter .page-transition-container,
.page-transition-leave-active .page-transition-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
