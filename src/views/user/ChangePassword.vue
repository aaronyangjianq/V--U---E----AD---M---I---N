<template>
  <div class="form-box">
    <a-form :form="form">
      <a-row>
        <a-col :offset="6" :span="10">
          <!-- <a-form-item label="原始密码" :label-col="{ span: 7 }" :wrapper-col="{ span: 17 }">
            <a-input
              v-decorator="[
                'opass',
                {rules: [{ required: true, message: '请输入原始密码!' }]}
              ]"
              placeholder="请输入原始密码"
              type="password"
            />
          </a-form-item> -->
          <a-form-item label="新密码" :label-col="{ span: 7 }" extra="注意：密码需为6位数以上，仅限字母与数字" :wrapper-col="{ span: 17 }">
            <a-input
              v-decorator="[
                'pass',
                {rules: [
                  { required: true, message: '请输入新密码!' },
                  { validator: validateToNextPassword },
                ]}
              ]"
              placeholder="输入新密码"
              type="password"
            />
          </a-form-item>
          <a-form-item label="重复新密码" :label-col="{ span: 7 }" :wrapper-col="{ span: 17 }">
            <a-input
              v-decorator="[
                'pass2',
                {rules: [
                  { required: true, message: '请确认新密码!' },
                  { validator: compareToFirstPassword },
                ]}
              ]"
              placeholder="再次输入新密码"
              type="password"
              @blur="ConfirmBlur"
            />
          </a-form-item>
          <a-form-item class="btn" label :label-col="{ span: 7 }" :wrapper-col="{ span: 17 }">
            <a-button @click="submit" size="large" type="primary" block>确认修改</a-button>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script>
import { changeUserPassword } from '@/services';
import { mapActions } from 'vuex';
export default {
  components: {},
  data () {
    return {
      confirmDirty: false,
      form: this.$form.createForm(this)
    };
  },
  methods: {
    ...mapActions(['Logout']),
    submit () {
      this.form.validateFields((err, value) => {
        if (!err) {
          changeUserPassword(value).then(res => {
            if (res.code === 100) {
              // 修改成功
              this.$message.success(res.msg);
              // 退出重登
              this.Logout().then(() => {
                // 不刷新页面，直接指向登录页
                this.$router.push('/user/login');
              });
            } else {
              // 修改失败
              this.$message.error(res.msg);
            }
          }).catch(err => {
            this.$message.error(`${err}，请稍候再试`);
          });
        }
      });
    },
    compareToFirstPassword  (rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue('pass')) {
        callback('两次输入的密码不一致，请重新输入！');
      } else {
        callback();
      }
    },
    validateToNextPassword  (rule, value, callback) {
      const form = this.form;
      const reg = /^[0-9A-Za-z]{6,}$/;
      if (value && !reg.test(value)) {
        callback('密码格式不正确！');
      }
      if (value && this.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    },
    ConfirmBlur (e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    }
  }
};
</script>

<style lang="less" scoped>
.form-box {
  padding: 20px;
  background-color: #fff;
}
</style>
<style lang="less">
.btn {
  .ant-form-item-control-wrapper {
    float: right;
  }
}
</style>
