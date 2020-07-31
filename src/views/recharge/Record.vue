<template>
  <div class="content-box">
    <!-- 统计信息 -->
    <a-descriptions :column="6" :colon="false">
      <a-descriptions-item label="充值总人数 ：">{{statisticsData.total.num}}</a-descriptions-item>
      <a-descriptions-item label="今日充值人数 ：">{{statisticsData.today.num}}</a-descriptions-item>
      <a-descriptions-item label="7天充值人数 ：">{{statisticsData.week.num}}</a-descriptions-item>
      <a-descriptions-item label="30天充值人数 ：">{{statisticsData.month.num}}</a-descriptions-item>
    </a-descriptions>
    <a-descriptions :column="6" :colon="false">
      <a-descriptions-item label="充值总金额 ：">{{statisticsData.total.price}}</a-descriptions-item>
      <a-descriptions-item label="今日充值金额 ：">{{statisticsData.today.price}}</a-descriptions-item>
      <a-descriptions-item label="7天充值金额 ：">{{statisticsData.week.price}}</a-descriptions-item>
      <a-descriptions-item label="30天充值金额 ：">{{statisticsData.month.price}}</a-descriptions-item>
    </a-descriptions>
    <a-button class="recharge-button" @click="$router.push('/recharge/Config')">充值价格配置</a-button>
    <!-- 搜索筛选头部 -->
    <a-form 
      layout="inline" 
      :form="filterForm" 
      @submit="onFilterSubmit" 
      style="background-color: #f0f0f0; padding: 16px; margin-top: 16px;">
      <!-- 充值时间 -->
      <a-form-item label="充值时间：">
        <a-range-picker
          separator="到"
          :show-time="false"
          format="YYYY-MM-DD"
          :placeholder="['开始时间', '结束时间']"
          @change="onchangeTime"
          style="width: 280px;"
        />
      </a-form-item>
      <!-- 手机号 -->
      <a-form-item label="充值手机号：">
        <a-input 
          v-model="filterForm.phone"
          style="width: 130px;"/>
      </a-form-item>
      <!-- 订单号 -->
      <a-form-item label="订单号：">
        <a-input 
          v-model="filterForm.oid"
          style="width: 130px;"/>
      </a-form-item>
      <!-- 状态 -->
      <a-form-item label="状态：">
        <a-select
          style="width: 100px;"
          @change="onchangeType"
        >
          <a-select-option 
            v-for="type in types" 
            :key="type.key" 
            :value="type.key"
          >
            {{ type.val }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">
          查询
        </a-button>
      </a-form-item>
    </a-form>
    <!-- 列表 -->
    <a-table 
      :columns="columns" 
      :pagination="pagination"
      :data-source="orderList" 
      :loading="isLoading"
      rowKey="id" 
      style="background-color: white; margin-top: 32px;" 
      @change="onTableChange">
      <span slot="action" slot-scope="text, data">
        <a @click="cancelOrder(data.id)">取消订单</a>
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
        form: this.$form.createForm(this, {
          area: 0,
          cate: 0,
          useState: 0,
        }),
        // 筛选查询的参数
        filterForm: {
          oid: null,
          phone: null,
          startdate: null,
          enddate: null,
          status: null
        },
        types: [],
        // 列表数据
        isLoading: false,
        columns: columns,
        pagination: {},
        orderList: [],
        statisticsData: {
          month: {
            num: null,
            price: null
          },
          week: {
            num: null,
            price: null
          },
          today: {
            num: null,
            price: null
          },
          total: {
            num: null,
            price: null
          }
        }
      };
    },
    async created() {
      const rawData = await this.GetDepositRecordList();
      this.orderList = rawData.result.list;
      this.statisticsData = rawData.result.news;
      this.types = rawData.result.status;
      this.pagination = rawData.result.page_info;
      this.pagination.pageSize = rawData.result.page_info.limit;
      this.pagination.current = rawData.result.page_info.page;
    },
    methods: {
      ...mapActions(['GetDepositRecordList']),
      onFilterSubmit(e) {
        e.preventDefault();
        this.form.validateFields(async(err, values) => {
          if (!err) {
            const recordInfo = this.filterForm;
            const rawData = await this.GetDepositRecordList(recordInfo);
            this.orderList = rawData.result.list;
            this.pagination = rawData.result.page_info;
            this.pagination.pageSize = rawData.result.page_info.limit;
            this.pagination.current = rawData.result.page_info.page;
          } else {
            console.log(err);
          }
        });
      },
      async onTableChange(pagination, filters, sorter) {
        this.pagination.current = pagination.current;
        const pageInfo = {
          page: pagination.current
        };
        const rawData = await this.GetDepositRecordList(pageInfo);
        this.orderList = rawData.result.list;
        this.pagination = rawData.result.page_info;
        this.pagination.pageSize = rawData.result.page_info.limit;
        this.pagination.current = rawData.result.page_info.page;
      },
      cancelOrder(oid) {
        
      },
      onchangeTime(date, datestring) {
        this.filterForm.startdate = datestring[0];
        this.filterForm.enddate = datestring[1];
      },
      onchangeType(value) {
        this.filterForm.status = value;
        console.log('onchangeType', this.filterForm);
      }
    }
  };
</script>

<style lang="less" scoped>
  .wrap-button-cdkey {
    align-items: center;
    justify-content: center;
  }
  .recharge-button {
    float: right;
    overflow: hidden;
    margin-top: -62px;
  }
</style>