<template>
  <div class="users-box">
    <!-- 统计信息 -->
    <a-row type="flex" align="middle" justify="space-between">
      <a-col :span="20">
        <a-descriptions :column="6" :colon="false" size="small">
          <a-descriptions-item label="自习室总座位 ：">{{statisticsData.total}}</a-descriptions-item>
          <a-descriptions-item label="当前使用 ：">{{statisticsData.use}}</a-descriptions-item>
          <a-descriptions-item label="当前空闲 ：">{{statisticsData.no_use}}</a-descriptions-item>
        </a-descriptions>
      </a-col>
      <a-col>
        <a-button type="primary" @click="onAppointmentRedirect">
          座位预约情况
        </a-button>
      </a-col>
    </a-row>
    
    <!-- 搜索筛选头部 -->
    <a-form 
      layout="inline" 
      @submit="onFilterSubmit"
      style="background-color: #f0f0f0; padding: 16px; margin-top: 16px;">
      <a-form-item label="区域：">
        <a-select
          placeholder="全部"
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
      <a-form-item label="状态：">
        <a-select
          placeholder="全部"
          @change="onStateChanged"
          style="width: 100px;"
        >
          <a-select-option 
            v-for="state in states" 
            :key="state.key" 
            :value="state.key">
            {{ state.val }}
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
      rowKey="pid" 
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
        :style="{color: data.on_status !== 1 ? 'green' : 'red'}">
        {{ data.on_status_name }}
      </span>
      <span slot="action" slot-scope="text, data, index">
        <a 
          @click="onToggleElectr(data, index)"
          :style="{color: data.on_status === 1 ? 'green' : 'red'}">
          {{data.on_status === 2 ? '点击关闭' : '点击开启'}}
        </a>
      </span>
    </a-table>
    <!-- 统计信息 -->
  </div>
</template>

<script>
import { columns } from './configs';
import { mapActions } from 'vuex';

export default {
  data () {
    return {
      // 用户数统计数据
      statisticsData: {},
      areas: [],
      states: [],
      // 筛选查询的参数
      formFilterParam: {
        status: 0,
        area: 0,
      },
      // 列表数据
      isLoading: false,
      columns: columns,
      pagination: {},
      seatList: [],
    };
  },
  async created() {
    const rawData = await this.GetPlaceList();
    this.seatList = rawData.result.list;
    this.statisticsData = rawData.result.news;
    this.pagination = rawData.result.page_info;
    this.pagination.pageSize = rawData.result.page_info.limit;
    this.pagination.current = rawData.result.page_info.page;
    this.areas = rawData.result.area;
    this.states = rawData.result.status;
  },
  methods: {
    ...mapActions(['GetPlaceList', 'UpdateButton']),
    onAppointmentRedirect() {
      this.$router.push({
        path: '/seat/appointment'
      });
    },
    onAreaChanged(value) {
      this.formFilterParam.area = value;
    },
    onStateChanged(value) {
      this.formFilterParam.status = value;
    },
    async onFilterSubmit(e) {
      const searchInfo = this.formFilterParam;
      const rawData = await this.GetPlaceList(searchInfo);
      this.seatList = rawData.result.list;
      this.pagination = rawData.result.page_info;
      this.pagination.pageSize = rawData.result.page_info.limit;
      this.pagination.current = rawData.result.page_info.page;
    },
    async onTableChange(pagination, filters, sorter) {
      this.pagination.current = pagination.current;
      const pageInfo = {
        page: pagination.current
      };
      const rawData = await this.GetPlaceList(pageInfo);
      this.seatList = rawData.result.list;
      this.pagination = rawData.result.page_info;
      this.pagination.pageSize = rawData.result.page_info.limit;
      this.pagination.current = rawData.result.page_info.page;
    },
    onToggleElectr(item, index) {
      const touchInfo = {
        pid: item.pid,
        status: item.on_status
      };
      this.isLoading = true;
      setTimeout(async () => {
        await this.UpdateButton(touchInfo);
        const rawData = await this.GetPlaceList();
        this.seatList = rawData.result.list;
        this.isLoading = false;
        }, 2000);
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
