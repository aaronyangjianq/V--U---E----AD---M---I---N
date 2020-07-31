<template>
  <div class="content-box">
    <!-- 搜索筛选头部 -->
    <a-form 
      layout="inline" 
      :form="form" 
      @submit="onFilterSubmit" 
      style="background-color: #f0f0f0; padding: 16px; margin-top: 16px;">
      <a-form-item label="订单时间：">
        <a-range-picker
          separator="到"
          :show-time="false"
          format="YYYY-MM-DD"
          :placeholder="['开始时间', '结束时间']"
          @change="changeOrderTime"
          style="width: 280px;"
        />
      </a-form-item>
      <!-- 区域 -->
      <a-form-item label="区域：">
        <a-select
          style="width: 100px;"
          :value="orderQuery.area"
          @change="changeArea"
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
      <!-- 订单状态 -->
      <a-form-item label="订单状态：">
        <a-select
          style="width: 100px;"
          :value="orderQuery.status"
          @change="changeOrderStatus"
        >
          <a-select-option 
            v-for="state in states" 
            :key="state.key" 
            :value="state.key">
            {{ state.val }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <!-- 订单号 -->
      <a-form-item label="订单号：">
        <a-input
          v-model="orderQuery.oid"
          style="width: 130px;"
        />
      </a-form-item>
      <!-- 手机号 -->
      <a-form-item label="手机号：">
        <a-input
          v-model="orderQuery.phone"
          style="width: 130px;"
        />
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
      :rowKey="record => record.id" 
      style="background-color: white; margin-top: 32px;" 
      @change="onTableChange">
      <span slot="action" slot-scope="text, data">
        <a v-if="data.cancel" @click="cancelOrder(data)">取消订单</a>
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
        form: this.$form.createForm(this),
        // 筛选查询的参数
        areas: [],
        states: [],
        // 列表数据
        isLoading: false,
        columns: columns,
        pagination: {
          pageSize: 30,
        },
        orderList: [],
        orderQuery: {
          start: '',
          end: '',
          area: 0,
          status: 0,
          oid: '',
          phone: '',
          page: 1,
        }
      };
    },
    created() {
      this.getOrderList(this.orderQuery);
    },
    methods: {
      ...mapActions(['GetOrderList', 'CancelOrder']),
      async getOrderList (data) {
        const rawData = await this.GetOrderList(data);
        if (rawData.result) {
          this.orderList = rawData.result.list.map(x => x);
          this.pagination = {
            ...rawData.result.page_info,
            pageSize: rawData.result.page_info.limit,
            current: rawData.result.page_info.page,
          };
          this.areas = rawData.result.area.map(x => x);
          this.states = rawData.result.status.map(x => x);
        }
      },
      onFilterSubmit(e) {
        e.preventDefault();
        this.form.validateFields(async (err, values) => {
          if (!err) {
            await this.getOrderList(this.orderQuery);
          }
        });
      },
      async onTableChange(pagination, filters, sorter) {
        const queryList = {
          ...this.orderQuery,
          page: pagination.current,
        };
        await this.getOrderList(queryList);
      },
      async cancelOrder(data) {
        const idParam = {
          id: data.id
        };
        const res = await this.CancelOrder(idParam);
        if (res.code === 100) {
          this.$message.success(res.msg);
          // 刷新列表
          await this.getOrderList(this.orderQuery);
        } else {
          this.$message.error(res.msg);
        }
      },
      async changeOrderTime(date, dateString) {
        this.orderQuery.start = dateString[0];
        this.orderQuery.end = dateString[1];
        await this.getOrderList(this.orderQuery);
      },
      async changeOrderStatus(value) {
        this.orderQuery.status = value;
        await this.getOrderList(this.orderQuery);
      },
      async changeArea(area) {
        this.orderQuery.area = area;
        await this.getOrderList(this.orderQuery);
      }
    }
  };
</script>

<style lang="less" scoped>
  .wrap-button-cdkey {
    align-items: center;
    justify-content: center;
  }
</style>