<template>
  <div class="user-wrapper">
    <div class="content-header-box">
      <a-dropdown>
        <span class="action ant-dropdown-link user-dropdown-menu">
          <span>{{ nickname() }}</span>
        </span>
        <a-menu slot="overlay" class="user-dropdown-menu-wrapper">
          <a-menu-item key="0">
            <router-link :to="{ name: 'accountChangePwd' }">
              <a-icon type="setting"/>
              <span>修改密码</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="1">
            <a href="javascript:;" @click="handleLogout">
              <a-icon type="logout"/>
              <span>退出登录</span>
            </a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </div>
</template>

<script>
import { Modal } from 'ant-design-vue';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'UserMenu',
  methods: {
    ...mapActions(['Logout']),
    ...mapState({
      nickname: state => state.user.name,
    }),
    handleLogout () {
      const that = this;
      Modal.confirm({
        title: '提示',
        content: '真的要退出登录吗 ?',
        onOk () {
          return that.Logout().then(() => {
            // 刷新页面，并获得当前Route
            window.location.reload();
            // 不刷新页面，直接指向登录页
            // that.$router.push('/user/login');
          }).catch(err => {
            that.$message.error(`${err}，请稍候再试`);
          });
        },
      });
    }
  }
};
</script>
