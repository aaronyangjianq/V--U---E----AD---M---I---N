<template>
  <a-breadcrumb class="breadcrumb">
    <a-breadcrumb-item v-for="item in breadList" :key="item.name">
      <router-link
        v-if="item.name != name"
        :to="{ path: item.path }"
      >{{ item.meta.title }}</router-link>
      <span v-else>{{ item.meta.title }}</span>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script>
import config from 'config';

export default {
  data () {
    return {
      name: '',
      breadList: []
    };
  },
  created () {
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb () {
      this.breadList = [];
      // 预设首页值
      this.breadList.push({name: 'index', path: config.defaultRoutePath, meta: {title: '首页'}});
      // 当前$route页面名称
      this.name = this.$route.name;
      // 循环$route取值
      this.$route.matched.forEach(item => {
        item.name !== 'index' && this.breadList.push(item);
      });
    }
  },
  watch: {
    $route () {
      this.getBreadcrumb();
    }
  }
};
</script>

<style scoped>
</style>
