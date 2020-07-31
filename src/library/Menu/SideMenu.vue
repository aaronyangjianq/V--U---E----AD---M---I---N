<template>
  <a-layout-sider
    :class="['sider', isDesktop() ? null : 'shadow', theme, fixSidebar ? 'ant-fixed-sidemenu' : null ]"
    width="256px"
    :collapsible="collapsible"
    v-model="collapsed"
    :trigger="null">
    <logo />
    <s-menu
      :collapsed="collapsed"
      :menu="menus"
      :theme="theme"
      :mode="mode"
      style="padding: 16px 0px;"></s-menu>
  </a-layout-sider>
</template>

<script>
import Logo from '@/library/tools/Logo';
import SMenu from './index';
import { mixin, mixinDevice } from '@/core/utils/mixin';

export default {
  name: 'SideMenu',
  components: { Logo, SMenu },
  mixins: [mixin, mixinDevice],
  props: {
    mode: {
      type: String,
      required: false,
      default: 'inline'
    },
    theme: {
      type: String,
      required: false,
      default: 'dark'
    },
    collapsible: {
      type: Boolean,
      required: false,
      default: false
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    },
    menus: {
      type: Array,
      required: true
    },
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.sider {
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
}
.sider.light {
  box-shadow: 2px 0 8px 0 rgba(29, 35, 41, 0.05);
  background-color: white;
}
.sider.light .logo {
  background: white;
  box-shadow: 1px 1px 0 0 #e8e8e8;
}
.sider.light .logo h1 {
  color: #1890ff;
}
.sider.light :global(.ant-menu-light) {
  border-right-color: transparent;
}
:global .drawer .drawer-content {
  background: #001529;
}
</style>
