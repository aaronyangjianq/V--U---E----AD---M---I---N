<template>
  <div>
    <a-form layout="horizontal" :form="form" @submit="onSubmit" style="padding: 0 24px;">
      <a-form-item label="当前电话：" label-align="left" :label-col="{span: 2}" :wrapper-col="{span: 6}">
        <span>{{phone}}</span>
      </a-form-item>
      <a-form-item label="新的电话：" label-align="left" :label-col="{span: 2}" :wrapper-col="{span: 6}">
        <a-input 
          v-model="setPhone"
        />
      </a-form-item>
      <a-form-item>
        <a-button :loading="isLoading" type="primary" html-type="submit" style="width: 300px; height: 40px;">确认修改</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      form: this.$form.createForm(this),
      isLoading: false,
      phone: null,
      setPhone: null
    };
  },
  async created() {
    const rawdata =  await this.GetPhone();
    this.phone = rawdata.result;
  },
  methods: {
    ...mapActions(['GetPhone', 'SetPhone']),
    onSubmit(e) {
      e.preventDefault();
      this.form.validateFields(async (err, values) => {
        const phoneCheck = /^1[34578]\d{9}$/;
        if(!phoneCheck.test(this.setPhone)) {
          return this.$message.error('请输入正确的手机号');
        }
        if (!err) {
          if(this.setPhone === null) {
            return this.$message.error('修改不为空');
          }
          this.isLoading = true;
          const phoneSet = {
            phone: this.setPhone
          };
          await this.SetPhone(phoneSet);
          this.$message.success('修改成功！');
          this.isLoading = false;
          this.setPhone = null;
          const rawdata = await this.GetPhone();
          this.phone = rawdata.result;
        } else {
          console.error(err);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>

</style>