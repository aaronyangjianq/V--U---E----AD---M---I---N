<template>
  <div class="logo">
    <router-link :to="{path: links}">
      <img src="@/assets/logo.png" />
      <h1 v-if="showTitle">{{ title }}</h1>
    </router-link>
  </div>
</template>

<script>
import config from 'config';

export default {
  name: 'Slogo',
  components: {
  },
  props: {
    title: {
      type: String,
      default: config.logoTitle,
      required: false
    },
    showTitle: {
      type: Boolean,
      default: true,
      required: false
    }
  },
  data () {
    return {
      links: config.defaultRoutePath,
    };
  }
};
</script>

<style lang="less" scoped>
.logo {
  cursor: pointer;

  img {
    width: 50px;
    height: 50px;
    display: inline-block;
    vertical-align: middle;
  }

}
</style>
