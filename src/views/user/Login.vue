<template>
  <div class="main">
    <a-form
      id="formLogin"
      class="user-layout-login"
      ref="formLogin"
      :form="form"
      @submit="handleSubmit"
    >
      <a-form-item>
        <a-input
          size="large"
          type="text"
          placeholder="输入账号"
          v-decorator="[
            'username',
            {rules: [{ required: true, message: '请输入账号' },], validateTrigger: 'change'}
          ]"
        >
          <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-input
          size="large"
          type="password"
          autocomplete="false"
          placeholder="输入密码"
          v-decorator="[
            'passwd',
            {rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur'}
          ]"
        >
          <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
        </a-input>
      </a-form-item>

      <a-form-item style="margin-top:24px">
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="login-button"
          :loading="state.loginBtn"
          :disabled="state.loginBtn"
        >确定</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import config from 'config';

export default {
  data () {
    return {
      loginBtn: false,
      loginType: 1,
      requiredTwoStepCaptcha: false,
      stepCaptchaVisible: false,
      form: this.$form.createForm(this),
      state: {
        time: 60,
        loginBtn: false,
        loginType: 1,
        smsSendBtn: false
      }
    };
  },
  methods: {
    ...mapActions(['Login']),
    handleSubmit (e) {
      e.preventDefault();
      const {
        form: { validateFields },
        state,
      } = this;
      state.loginBtn = true;

      const validateFieldsKey = ['username', 'passwd'];

      validateFields(validateFieldsKey, { force: true }, (err, values) => {
        if (!err) {
          // const loginParams = { ...values };
          // delete loginParams.username;
          // loginParams[!state.loginType ? 'email' : 'username'] =
          //   values.username;
          // loginParams.passwd = values.passwd;
          const loginParams = {
            username: values.username,
            passwd: values.passwd,
          };
          // 登录请求
          this.Login(loginParams)
            .then(res => this.loginSuccess(res))
            .catch(err => this.requestFailed(err))
            .finally(() => {
              state.loginBtn = false;
            });
        } else {
          setTimeout(() => {
            state.loginBtn = false;
          }, 600);
        }
      });
    },
    loginSuccess (res) {
      // 设置跳转
      if (this.$route.query.redirect) {
        this.$router.push({ path: this.$route.query.redirect });
      } else {
        this.$router.push({ path: config.defaultRoutePath });
      }
      // 延迟 1 秒显示欢迎信息
      setTimeout(() => {
        this.$notification.success({
          message: '欢迎',
          description: `欢迎回来`
        });
      }, 1000);
    },
    requestFailed (err) {
      this.$notification.error({
        message: '错误',
        description:
          ((err.response || {}).data || {}).message || err.msg ||
          '请求出现错误，请稍后再试',
        duration: 4
      });
    }
  }
};
</script>

<style lang="less" scoped>
.user-layout-login {
  margin-top: 50px;
  label {
    font-size: 14px;
  }
  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .register {
      float: right;
    }
  }
}
</style>
