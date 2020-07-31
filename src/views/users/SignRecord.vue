<template>
  <div class="users-box">
    <!-- 搜索筛选头部 -->
    <a-form 
      layout="inline" 
      :span="24"
      @submit="onFilterSubmit"
      style="background-color: #f0f0f0; padding: 16px; margin-top: 16px;">
      <a-form-item label="用户ID：">
        {{user_info.uid}}
        <a-divider type="vertical" style="background-color: rgba(0, 0, 0, 0.85);" />
      </a-form-item>
      <a-form-item label="用户手机：">
        {{user_info.phone}}
      </a-form-item>
      <a-form-item label="年月：" style="margin-left: 10%;">
        <a-month-picker :disabled-date="disabledDate" placeholder="选择月份" @change="onChange" />
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
      :rowKey="record => record.srid" 
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

import { columns } from './configs/signRecord';
import { mapActions } from 'vuex';

export default {
  data () {
    return {
      // 筛选查询的参数
      pagination: {
        pageSize: 30,
      },
      // 列表数据
      isLoading: false,
      columns: columns,
      seatList: [],
      uid: null,
      user_info: {},
      year: '',
      month: ''
    };
  },
  async created() {
    const id = this.$route.params.uid;
    const record = {
      uid: id
    };
    const rawData = await this.GetUserRecord(record);
    this.uid = id;
    this.seatList = rawData.result.list;
    this.pagination = rawData.result.page_info;
    this.user_info = rawData.result.user_info;
  },
  methods: {
    ...mapActions(['GetUserRecord']),
    async onFilterSubmit(e) {
      const record = {
        uid: this.uid,
        year: this.year,
        month: this.month
      };
      const rawData = await this.GetUserRecord(
        record
      );
      this.seatList = rawData.result.list;
      this.pagination = rawData.result.page_info;
    },
    async onTableChange(pagination, filters, sorter) {
      const record = {
        uid: this.uid,
        page: pagination.current
      };
      const rawData = await this.GetUserRecord(
        record
      );
      this.seatList = rawData.result.list;
      this.pagination = rawData.result.page_info;
    },
    onToggleElectr(item, index) {
      item.electrState = !item.electrState;
    },
    disabledDate() {

    },
    onChange(date, dateString) {
      const dateArr = dateString.split('-');
      this.year = dateArr[0];
      this.month = dateArr[1];
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
