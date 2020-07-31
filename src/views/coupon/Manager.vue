<template>
  <div class="content-box">
    <div class="flex-row wrap-button-cdkey">
      <a-button type="primary" @click="$router.push('/cdkey/list')">兑换码审核</a-button>
    </div>
    <!-- 列表 -->
    <a-table 
      style="margin-top: 10px;" 
      tableLayout="fixed"
      :columns="columns"
      :pagination="false"
      :data-source="datas"
      :rowKey="record => record.cid">
      <template slot="name" slot-scope="name, data">
        <a-input v-model="data.name" :disabled="!data.edit" />
      </template>
      <template slot="new_price" slot-scope="text, data">
        <a-input placeholder="输入新的价格" v-model="data.price" />
      </template>
      <template slot="status" slot-scope="text, data">
        {{ data.status == 1 ? '售卖中' : '停止售卖' }}
      </template>
      <template slot="action" slot-scope="data">
        <a-button 
          type="link"
          @click="onSaving(data)">
          保存
        </a-button>
        <a-divider type="vertical" />
        <a-button 
          type="link"
          :style="{ color: (data.status == 1 ? 'red' : 'green')}"
          @click="onRowChangeState(data)"
        >
          {{ data.status == 1 ? '点击停止售卖' : '点击恢复售卖' }}
        </a-button>
      </template>
    </a-table>
    <div class="flex-row wrap-button-footer">
      <a-button type="link" @click="onAddNew">点击增加双人卡券<a-icon type="plus-square" theme="filled" style="width: 20px; height: 20px; color: #1890ff;"/></a-button>
    </div>
    <!-- 添加表达弹窗 -->
    <div v-if="visibleAddModal">
      <a-modal
        title="添加双人区卡券"
        :visible="visibleAddModal"
        @cancel="onClose"
      >
        <a-form
          :form="form"
          layout="inline"
          hide-required-mark>
          <!-- 区域 -->
          <a-row>
            <a-col>
              <a-form-item label="卡券区域：" label-align="left" style="width: 100%; text-align: left;" :label-col="{span: 4}" :wrapper-col="{ span: 20 }">
                <span>双人区</span>
              </a-form-item>
            </a-col>
          </a-row>
          <!-- 名称 -->
          <a-row>
            <a-col>
              <a-form-item label="卡券名称" label-align="left" style="width: 100%; text-align: left;" :label-col="{span: 4}" :wrapper-col="{ span: 20 }">
                <a-input
                  v-decorator="[
                    'name',
                    {
                      initialValue: addCoupon.name,
                      rules: [{ required: true, message: '请输入卡券名称' }],
                    },
                  ]"
                  style="width: 100%"
                  placeholder="输入新的卡券名称"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <!-- 价格 -->
          <a-row>
            <a-col>
              <a-form-item label="卡券价格" label-align="left" style="width: 100%; text-align: left;" :label-col="{span: 4}" :wrapper-col="{ span: 20 }">
                <a-input
                  v-decorator="[
                    'price',
                    {
                      initialValue: addCoupon.price,
                      rules: [{ required: true,  pattern: '^([1-9]\\d{0,9}|0)(\\.\\d{1,2})?$', message: '请输入正确价格' }],
                    },
                  ]"
                  style="width: 100%"
                  placeholder="输入新的价格"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <!-- 卡券时长 -->
          <a-row>
            <a-col>
              <a-form-item label="卡券时长" label-align="left" style="width: 100%; text-align: left;" :label-col="{span: 4}" :wrapper-col="{ span: 20 }">
                <a-row class="flex-row">
                  <a-col :span="4" style="text-align: left;">激活后的</a-col>
                  <a-col>
                    <a-select
                      v-decorator="[
                        'addCoupon.start',
                        {
                          rules: [{ required: true, message: '请输入卡券时长起始时间' }],
                        },
                      ]"
                      @change="onchangeStart" 
                      style="width: 100px"
                    >
                      <a-select-option v-for="start in startTime" :key="start.id" :value="start.value">
                        {{ start.value }}
                      </a-select-option>
                    </a-select>
                  </a-col>
                  <a-col :span="3" style="text-align: center;">点到</a-col>
                  <a-col>
                    <a-select 
                      v-decorator="[
                        'addCoupon.end',
                        {
                          rules: [{ required: true, message: '请输入卡券时长结束时间' }],
                        },
                      ]"
                      @change="onchangeEnd" 
                      style="width: 100px"
                    >
                      <a-select-option v-for="end in endTime" :key="end.id" :value="end.value">
                        {{ end.value }}
                      </a-select-option>
                    </a-select>
                  </a-col>
                  <a-col :span="2" style="text-align: center;">点</a-col>
                </a-row>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
        <template slot="footer">
          <a-button 
            style="margin-right: auto;" 
            type="primary" 
            :loading="confirmLoading" 
            @click="onAddConfirm">
            确定
          </a-button>
        </template>
      </a-modal>
    </div>
  </div>
</template>

<script>
  import { columns } from './configs';
  import { dateFormatter } from '@/core/utils';
  import { mapActions } from 'vuex';
  export default {
    data() {
      return {
        columns: columns,
        datas: [],
        // 添加表单
        form: null,
        visibleAddModal: false,
        // 确认添加加载中
        confirmLoading: false,
        addCoupon: {
          name: '',
          price: null,
          start: '',
          end: ''
        },
        startTime: [
          {id: 1, value: 8},
          {id: 2, value: 9},
          {id: 3, value: 10},
          {id: 4, value: 11},
          {id: 5, value: 12},
          {id: 6, value: 13},
          {id: 7, value: 14},
          {id: 8, value: 15},
          {id: 9, value: 16},
          {id: 10, value: 17},
          {id: 11, value: 18},
          {id: 12, value: 19},
          {id: 13, value: 20},
          {id: 14, value: 21},
          {id: 15, value: 22}
        ],
        endTime: [
          {id: 1, value: 9},
          {id: 2, value: 10},
          {id: 3, value: 11},
          {id: 4, value: 12},
          {id: 5, value: 13},
          {id: 6, value: 14},
          {id: 7, value: 15},
          {id: 8, value: 16},
          {id: 9, value: 17},
          {id: 10, value: 18},
          {id: 11, value: 19},
          {id: 12, value: 20},
          {id: 13, value: 21},
          {id: 14, value: 22},
          {id: 15, value: 23}
        ]
      };
    },
    async created() {
      const rawData = await this.GetCouponList();
      this.datas = rawData.result;
    },
    methods: {
      ...mapActions(['GetCouponList', 'SetStatus', 'AddCoupon', 'SaveCoupon']),
      async onSaving(data) {
        if (data.price.length > 0 && !data.price.match(/^([1-9]\d{0,9}|0)(\.\d{1,2})?$/g)) {
          this.$message.warning('请输入正确的价格！');
          return;
        }
        const saveCouponData = {
          cid: data.cid,
          name: data.name,
          price: data.price,
        };
        const res = await this.SaveCoupon(saveCouponData);
        if (res.code === 100) {
          this.$message.success(res.msg);
          // 刷新列表
          const rawData = await this.GetCouponList();
          this.datas = rawData.result && rawData.result.map(x => x);
        } else {
          this.$message.error(res.msg);
        }
      },
      async onRowChangeState(data) {
        const statusInfo = {
          cid: data.cid,
          status: data.status === 1 ? 2 : 1
        };
        await this.SetStatus(statusInfo);
        const rawData = await this.GetCouponList();
        this.datas = rawData.result && rawData.result.map(x => x);
      },
      onAddNew() {
        this.form = this.$form.createForm(this);
        this.visibleAddModal = true;
      },
      onClose() {
        this.visibleAddModal = false;
      },
      onchangeStart(startTime) {
        this.addCoupon.start = startTime;
      },
      onchangeEnd(endTime) {
        this.addCoupon.end = endTime;
      },
      onAddConfirm() {
        this.form.validateFields(async (err, value) => {
          if (!err) {
            this.confirmLoading = true;
            const coupon = {
              name: value.name,
              price: value.price,
              start: value.addCoupon.start,
              end: value.addCoupon.end
            };
            const res = await this.AddCoupon(coupon);
            if (res.code === 100) {
              this.$message.success(res.msg);
              // 刷新列表
              const rawData = await this.GetCouponList();
              this.datas = rawData.result && rawData.result.map(x => x);
              this.confirmLoading = false;
              this.visibleAddModal = false;
            } else {
              this.$message.error(res.msg);
              this.confirmLoading = false;
            }
          }
        });
      },
    },
  };
</script>

<style lang="less" scoped>
  .wrap-button-cdkey {
    align-items: center;
    justify-content: flex-end;
  }
  .wrap-button-footer {
    margin-top: 18px;
    align-items: center;
  }
</style>