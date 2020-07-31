<template>
  <a-dropdown
    class="logo" 
    :trigger="['click']"
    @visibleChange="handleVisible"
  >
    <div class="action">
      <img :src="curSite.img" />
      <h1 class="tit" v-if="showTitle">{{ curSite.name }}管理后台<a-icon class="icons" :type="visibles ? 'up' : 'down'" /></h1>
    </div>
    <a-menu slot="overlay">
      <a-menu-item
        style="padding-left:24px;" 
        v-for="(a, index) in sites" 
        :key="index"
      >
        <a href="javascript:void(0);" @click="handleClick(a.sitename)">
          <img :src="a.img" style="width: 32px; height: 32px; display: inline-block; vertical-align: top;" />
          <h1 v-if="showTitle" style="line-height: 32px; font-size: 16px; font-weight: 400; margin: 0 0 0 12px; display: inline-block;">{{ a.name }}管理后台</h1>
        </a>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Logo',
  components: {
  },
  props: {
    showTitle: {
      type: Boolean,
      default: true,
      required: false
    },
  },
  data () {
    return {
      sites: [],
      visibles: false,
    };
  },
  computed: {
    ...mapState({
      siteList: state => state.user.siteList,
      curSite: state => state.app.currentSite,
    })
  },
  created () {
    this.sites = this.siteList.filter(sl => {
      return sl.flag;
    });
  },
  methods: {
    handleVisible (bool) {
      this.visibles = bool; 
    },
    handleClick (value) {
      this.visibles = false;
      this.$router.push({ name: value });
    }
  }
};
</script>

<style lang="less" scoped>
.logo {
  cursor: pointer;

  .tit {
    font-size: 18px;

    .icons {
      margin-left: 5px;
      vertical-align: middle;

      svg {
        width: 18px;
        height: 18px;
      }
    }
  }
}
</style>
