<template>
  <div class="content-box">
    <!-- <div class="flex-row wrap-button-create">
      <a-button type="primary" @click="$router.push('/cdkey/add')">生成兑换码</a-button>
    </div> -->
    <!-- 搜索筛选头部 -->
    <a-form 
      layout="inline" 
      :form="filterForm" 
      @submit="onFilterSubmit" 
      style="background-color: #f0f0f0; padding: 16px; margin-top: 16px;">
      <a-form-item label="申请时间：">
        <a-range-picker
          separator="到"
          :show-time="false"
          format="YYYY-MM-DD"
          :placeholder="['开始时间', '结束时间']"
          @change="onchangeAdd"
          style="width: 280px;"
        />
      </a-form-item>
      <a-form-item label="审核时间：">
        <a-range-picker
          separator="到"
          :show-time="false"
          format="YYYY-MM-DD"
          :placeholder="['开始时间', '结束时间']"
          @change="onchangeVerify"
          style="width: 280px;"
        />
      </a-form-item>
      <!-- 状态 -->
      <a-form-item label="状态">
        <a-select
          @change="onchangeStatus"
          style="width: 100px;"
        >
          <a-select-option 
            v-for="cate in cates" 
            :key="cate.key" 
            :value="cate.key"
          >
            {{ cate.val }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="手机号：">
        <a-input 
          v-model="filterForm.phone"
          style="width: 130px;"/>
      </a-form-item>
            <a-form-item label="兑换码：">
        <a-input 
          v-model="filterForm.code"
          style="width: 130px;"/>
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
      :data-source="userList" 
      :loading="isLoading"
      rowKey="ccid" 
      style="background-color: white; margin-top: 32px;" 
      @change="onTableChange">
      <span slot="keycode" slot-scope="text, data">
        <span style="color: red;">{{data.prefix}}</span>
        <span>{{data.keycode}}</span>
      </span>
      <!-- <span slot="status" slot-scope="text, data">
        <span style="color: red;">{{changeStatus(data.status)}}</span>
      </span> -->
      <template slot="status" slot-scope="text, data">
        <a-button 
          v-if="data.status === 1"
          type="link"
          @click="pass(data)"
          style="color: green;"
        >
          审核通过
        </a-button>
        <a-divider type="vertical" v-if="data.status === 1" />
        <a-button
          v-if="data.status === 1" 
          type="link"
          @click="reject(data)"
          style="color: red;"
        >
          拒绝
        </a-button>
        <span v-if="data.status !== 1">无</span>
      </template>
    </a-table>
    <div v-if="visible">
      <a-modal
        title="选择发放给用户的卡券类型"
        :visible="visible"
        :confirm-loading="confirmLoading"
        @ok="handleOk"
        @cancel="handleCancel"
      >
        <div>
          <a-select
            :allowClear="true"
            :defaultValue="cards[0]&&cards[0].name"
            @change="onchangeCardStatus"
            style="width: 400px;"
          >
            <a-select-option 
              v-for="card in cards" 
              :key="card.cid" 
              :value="card.cid"
            >
              {{ card.name }}
            </a-select-option>
          </a-select>
        </div>
      </a-modal>
    </div>
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
          addStart: '',
          addEnd: '',
          verifyStart: '',
          verifyEnd: '',
          status: null,
          phone: null,
          code: null
        },
        areas: [
          { id: 0, name: '全部' },
          { id: 1, name: '单人明区' },
          { id: 2, name: '单人暗区' },
          { id: 3, name: '双人区（靠窗）' },
          { id: 4, name: '双人去（靠墙）' },
        ],
        cates: [],
        // 列表数据
        isLoading: false,
        columns: columns,
        pagination: {
          // current: 1,
          // hideOnSinglePage: false,
          // defaultPageSize: 10,
        },
        userList: [],
        visible: false,
        rejectVisible: false,
        confirmLoading: false,
        cards: [],
        sendInfo: {
          ccid: null,
          cid: null
        }
      };
    },
    async created() {
      const rawData = await this.Codeverify();
      this.userList = rawData.result.list;
      this.cates = rawData.result.status;
      this.cards = rawData.result.coupon_list;
      this.pagination = rawData.result.page_info;
      this.pagination.pageSize = rawData.result.page_info.limit;
      this.pagination.current = rawData.result.page_info.page;
    },
    methods: {
      ...mapActions(['Codeverify', 'PassCoupon', 'NopassCoupon']),
      onFilterSubmit(e) {
        e.preventDefault();
        this.form.validateFields(async (err, values) => {
          if (!err) {
            const filterInfo = this.filterForm;
            const rawData = await this.Codeverify(filterInfo);
            if(rawData.code === 100) {
              this.userList = rawData.result.list;
              this.pagination = rawData.result.page_info;
              this.pagination.pageSize = rawData.result.page_info.limit;
              this.pagination.current = rawData.result.page_info.page;    
            } else {
              this.$message.error(rawData.msg);
            }
          } else {
            console.log(err);
          }
        });
      },
      async onTableChange(pagination, filters, sorter) {
        const pageInfo = {
          page: pagination.current
        };
        const rawData = await this.Codeverify(pageInfo);
        this.userList = rawData.result.list;
        this.pagination = rawData.result.page_info;
        this.pagination.pageSize = rawData.result.page_info.limit;
        this.pagination.current = rawData.result.page_info.page; 
      },
      onchangeStatus(value) {
        this.filterForm.status = value;
      },
      onchangeAdd(dateAdd, dateAddString) {
        this.filterForm.addStart = dateAddString[0];
        this.filterForm.addEnd = dateAddString[1];
      },
      onchangeVerify(date, dateString) {
        this.filterForm.verifyStart = dateString[0];
        this.filterForm.verifyEnd = dateString[1];
      },
      changeStatus(status) {
        if(status === 1) {
          return '审核通过 | 拒绝';
        } else {
          return '无';
        }
      },
      pass(data) {
        this.visible = true;
        this.sendInfo.ccid = data.ccid;
      },
      async reject(rejectInfo) {
        const reject = {
          ccid: rejectInfo.ccid
        };
        await this.NopassCoupon(reject);
        const rawData = await this.Codeverify();
        this.userList = rawData.result.list;
      },
      onchangeCardStatus(value) {
         this.sendInfo.cid = value;
      },
      async handleOk() {
        if(this.sendInfo.cid === null) {
          return this.$message.info('请选择发放给用户的卡券类型');
        }
        const passInfo = this.sendInfo;
        this.confirmLoading = true;
        await this.PassCoupon(passInfo);
        const rawData = await this.Codeverify();
        this.userList = rawData.result.list;
        this.confirmLoading = false;
        this.visible = false;
        this.sendInfo = {};
      },
      handleCancel() {
        this.visible = false;
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