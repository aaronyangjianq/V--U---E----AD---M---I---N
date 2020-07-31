<template>
  <div class="users-box">
    <!-- 统计信息 -->
    <a-descriptions :column="4" :colon="false" size="small">
      <a-descriptions-item label="总用户数 ：">{{statisticsData.total}}</a-descriptions-item>
      <a-descriptions-item label="今日新增用户 ：">{{statisticsData.today}}</a-descriptions-item>
      <a-descriptions-item label="7天新增用户 ：">{{statisticsData.week}}</a-descriptions-item>
      <a-descriptions-item label="30天新增用户 ：">{{statisticsData.month}}</a-descriptions-item>
    </a-descriptions>
    <!-- 搜索筛选头部 -->
    <a-form :layout="filterForm.layout" :form="form"  @submit="onFilterSubmit" style="background-color: #f0f0f0; padding: 16px; margin-top: 16px;">
      <a-form-item label="用户ID：">
        <a-input v-model="usersQuery.uid" placeholder="ID" style="width: 100px;"/>
      </a-form-item>
      <a-form-item label="用户名称：">
        <a-input v-model="usersQuery.userName" placeholder="用户名称" style="width: 150px;"/>
      </a-form-item>
      <a-form-item label="用户手机号：">
        <a-input v-model="usersQuery.phone" placeholder="用户手机号" style="width: 130px;"/>
      </a-form-item>
      <a-form-item label="用户注册时间：">
        <a-range-picker
          separator="到"
          :show-time="false"
          format="YYYY-MM-DD"
          :placeholder="['开始时间', '结束时间']"
          @change="onFilterDateChanged"
          style="width: 280px;"
        />
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
      :data-source="userList" 
      :loading="isLoading"
      :rowKey="data => data.uid" 
      style="background-color: white; margin-top: 32px;" 
      @change="onTableChange">
      <span slot="action" slot-scope="data">
        <a @click="onRouteToUserCoupon(data.uid)">用户卡券</a>
        <a-divider type="vertical"/>
        <a @click="onRouteToUserSignRecord(data.uid)">打卡记录</a>
      </span>
    </a-table>
  </div>
</template>

<script>

import { columns } from './configs';
import { mapActions } from 'vuex';

export default {
  data () {
    return {
      // 用户数统计数据
      statisticsData: {
        total: null,
        today: null,
        week: null,
        month: null
      },
      // 筛选查询的参数
      filterForm: {
        layout: 'inline',
        userId: '',
        userName: '',
        phone: '',
        startDate: null,
        endDate: null,
      },
      // 列表数据
      isLoading: false,
      columns: columns,
      pagination: {
        pageSize: 30,
      },
      userList: [],
      form: this.$form.createForm(this),
      usersQuery: {
        uid: '',
        username: '',
        phone: '',
        startdate: '',
        enddate: '',
        page: 1
      }
    };
  },
  created() {
    this.getUserList(this.usersQuery);
  },
  methods: {
    ...mapActions(['GetUserList']),
    async getUserList (data) {
      const rawData = await this.GetUserList(data);
        if (rawData.result) {
          this.userList = rawData.result.list.map(x => x);
          this.pagination = {
            ...rawData.result.page_info,
            pageSize: rawData.result.page_info.limit,
            current: rawData.result.page_info.page,
          };
          this.statisticsData = rawData.result && rawData.result.news;
        }
    },
    async onFilterDateChanged(dates, dateString) {
      this.usersQuery.startdate = dateString[0];
      this.usersQuery.enddate = dateString[1];
      await this.getUserList(this.usersQuery);
    },
    async onFilterSubmit(e) {
      e.preventDefault();
      this.form.validateFields(async (err, values) => {
          if (!err) {
            await this.getUserList(this.usersQuery);
          }
      });
    },
    async onTableChange(pagination, filters, sorter) {
      const queryList = {
          ...this.orderQuery,
          page: pagination.current,
        };
      await this.getUserList(queryList);
    },
    onRouteToUserCoupon(uid) {
      this.$router.push({ path: '/users/usercoupon/' + uid });
    },
    onRouteToUserSignRecord(uid) {
      this.$router.push({ path: '/users/signrecord/' + uid });
    }
  }
};
</script>

<style lang="less" scoped>
  .users-box {
    padding: 16px 32px;
    background-color: white;
  }
</style>

