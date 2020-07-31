<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <router-view />
    </div>
  </a-config-provider>
</template>

<script>
// 引入antd中文包
import zhCN from 'ant-design-vue/es/locale/zh_CN';
// 引入根据设备初始化
import { AppDeviceEnquire } from '@/core/utils/mixin';

export default {
  name: 'App',
  mixins: [AppDeviceEnquire],
  data () {
    return {
      locale: zhCN,
    };
  },
};
</script>

<style>
  #app {
    height: 100%;
  }
  .content-box {
    padding: 16px 32px;
    background-color: white;
  }
  .flex-row {
    display: flex;
    flex-direction: row;
  }
  .flex-column {
    display: flex;
    flex-direction: column;
  }
</style>
