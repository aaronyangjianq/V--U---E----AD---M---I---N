<template>
  <div class="users-box">
    <!-- 搜索筛选头部 -->
    <a-form 
      layout="inline" 
      :span="24"
      @submit="onFilterSubmit"
      style="background-color: #f0f0f0; padding: 16px; margin-top: 16px;">
      <a-form-item label="用户ID：">
        {{userInfo.uid}}
        <a-divider type="vertical" style="background-color: rgba(0, 0, 0, 0.85);" />
      </a-form-item>
      <a-form-item label="用户手机：">
        {{userInfo.phone}}
        <a-divider type="vertical" style="background-color: rgba(0, 0, 0, 0.85);" />
      </a-form-item>
      <!-- <a-form-item label="卡券数量：" style="font-weight: 500;">
        {{12}}
        <a-divider type="vertical" style="background-color: rgba(0, 0, 0, 0.85);" />
      </a-form-item> -->
      <a-form-item label="区域：">
        <a-select
          :defaultValue="areas[0].key"
          @change="onAreaChanged"
          style="width: 160px;"
        >
          <a-select-option 
            v-for="area in areas" 
            :key="area.key" 
            :value="area.key"
          >
            {{ area.val }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="类型：">
        <a-select
          :defaultValue="cates[0].key"
          placeholder="选择类型"
          @change="onCateChanged"
          style="width: 100px;"
        >
          <a-select-option 
            v-for="cate in cates" 
            :key="cate.key" 
            :value="cate.key">
            {{ cate.val }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">
          查询
        </a-button>
      </a-form-item>
    </a-form>
    <!-- 用户列表 -->
    <a-table 
      :columns="columns" 
      :pagination="pagination"
      :data-source="seatList" 
      :loading="isLoading"
      :rowKey="data => data.ucid" 
      style="background-color: white; margin-top: 32px;" 
      @change="onTableChange">
      <span 
        slot="status" 
        slot-scope="text, data"
        :style="{color: data.status === '空闲' ? 'green' : 'red'}">
        {{ data.status }}
      </span>
      <span 
        slot="electrState" 
        slot-scope="text, data"
        :style="{color: data.electrState ? 'green' : 'red'}">
        {{ data.electrState ? '开启' : '关闭' }}
      </span>
      <span slot="action" slot-scope="text, data, index">
        <a 
          @click="onToggleElectr(data, index)"
          :style="{color: !data.electrState ? 'green' : 'red'}">
          {{data.electrState ? '点击关闭' : '点击开启'}}
        </a>
      </span>
    </a-table>
  </div>
</template>

<script>

import { columns } from './configs/coupon';
import { mapActions } from 'vuex';

export default {
  data () {
    return {
      // 用户数统计数据
      statisticsData: {

      },
      areas: [
        { key: 0, val: '全部' },
      ],
      cates: [
        { key: 0, val: '全部' },
      ],
      // 筛选查询的参数
      formFilterParam: {
        area: 0,
        state: 0,
      },
      // 列表数据
      isLoading: false,
      columns: columns,
      seatList: [],
      pagination: {
        pageSize: 30,
      },
      uid: null,
      userInfo: {}
    };
  },
  async created() {
    const id = this.$route.params.uid;
    const coupon = {
      uid: id
    };
    const rawData = await this.GetUserCoupons(coupon);
    this.uid = id;
    this.seatList = rawData.result && rawData.result.list;
    this.pagination = rawData.result && rawData.result.page_info;
    this.userInfo = rawData.result.user_info;
    this.areas = rawData.result.type;
    this.cates = rawData.result.cate;
  },
  methods: {
    ...mapActions(['GetUserCoupons']),
    onAreaChanged(value) {
      this.formFilterParam.area = value;
      // 刷新列表
      this.onFilterSubmit();
    },
    onCateChanged(value) {
      this.formFilterParam.state = value;
      // 刷新列表
      this.onFilterSubmit();
    },
    async onFilterSubmit(e) {
      const coupon = {
        uid: this.uid,
        type: this.formFilterParam.area,
        cate: this.formFilterParam.state
      };
      const rawData = await this.GetUserCoupons(coupon);
      this.seatList = rawData.result && rawData.result.list;
      this.pagination = rawData.result && rawData.result.page_info;
    },
    async onTableChange(pagination, filters, sorter) {
      const coupon = {
        uid: this.uid,
        page: pagination.current
      };
      const rawData = await this.GetUserCoupons(
        coupon
      );
      this.seatList = rawData.result && rawData.result.list;
      this.pagination = rawData.result && rawData.result.page_info;
    },
    onToggleElectr(item, index) {
      item.electrState = !item.electrState;
    },
  }
};
</script>

<style lang="less" scoped>
  .users-box {
    padding: 16px 32px;
    background-color: white;
  }
</style>
