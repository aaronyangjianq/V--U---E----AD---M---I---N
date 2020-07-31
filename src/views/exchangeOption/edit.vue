<template>
  <div class="flex-column wrap-content">
    <p>
      <span>当前设置：</span><br/><br/>
      <span>{{hour}}小时学习时长，兑换一小时单人卡券</span><br/><br/>
      <span>修改为：</span><br/><br/>
      <div class="flex-row" style="width: 100%; align-items: center;">
        <a-input style="width: 100px;" v-model="setHour"/>
        <span style="margin-left: 12px;">小时学习时长，兑换一小时单人卡券</span>
      </div><br/>
      <a-button type="primary" :loading="isLoading" @click="onConfirm">确认修改</a-button>
    <p/>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      isLoading: false,
      hour: null,
      setHour: null
    };
  },
  async created() {
    const rawdata =  await this.GetHour();
    this.hour = rawdata.result;
  },
  methods: {
    ...mapActions(['GetHour', 'SetHour']),
    onConfirm() {
      if(this.setHour === null) {
        return this.$message.error('修改不为空');
      }
      this.isLoading = true;
      const setHour = {
        hour: this.setHour
      };
      this.SetHour(setHour);
      setTimeout(async() => {
        this.isLoading = false;
        this.$message.success('修改成功！');
        this.setHour = null;
        const rawdata = await this.GetHour();
        this.hour = rawdata.result;
      }, 1000);
    }
  }
};
</script>

<style lang="less" scoped>
  .wrap-content {
    align-items: flex-start;
    padding: 24px;
  }
</style>