<template>
  <div class="users-box">
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="onSubmit">
      <a-form-item>
        <a-select
          :value="areaInfo.aid"
          @change="onSelectChange"
          style="width: 300px;"
          placeholder="选择区域"
        >
          <a-select-option 
            v-for="area in areas" 
            :key="area && area.key" 
            :value="area && area.key">
            {{ area.val }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="桌子数量" labelAlign="left" :labelCol="{ span: 3, offset: 0 }" :wrapperCol="{ span: 2, offset: 0 }">
        <!-- <a-input value="19" disabled="true"/> -->
        <span>{{ areaInfo.num }}</span>
      </a-form-item>
      <a-form-item label="1. 当前区域名称" labelAlign="left" :labelCol="{ span: 3, offset: 0 }">
        <span>{{ areaInfo.title }}</span>
      </a-form-item>
      <a-form-item label="新的区域名称" labelAlign="left" :labelCol="{ span: 3, offset: 0 }">
        <a-input 
          v-decorator="[
            'areaName', 
            {
              rules: [{ required: true, message: '输出新的区域名称' }]
            }
          ]"
        />
      </a-form-item>
      <a-form-item label="2. 当前区域描述" labelAlign="left" :labelCol="{ span: 3, offset: 0 }">
        <span>{{areaInfo.content}}</span>
      </a-form-item>
      <a-form-item label="新的区域描述" labelAlign="left" :labelCol="{ span: 3, offset: 0 }">
        <a-textarea
          :rows="4"
          v-decorator="[
            'areaDesc',
            {
              rules: [{ required: true, message: '输出新的区域描述' }]
            }
          ]"
        />
      </a-form-item>
      <a-form-item 
        label="3. 当前价格" 
        labelAlign="left" 
        :labelCol="{ span: 3, offset: 0 }">
        <span>{{areaInfo.price}}/h</span>
      </a-form-item>
      <a-form-item 
        label="新的价格设定" 
        labelAlign="left" 
        :labelCol="{ span: 3, offset: 0 }" 
        :wrapperCol="{ span: 3, offset: 0 }">
        <div style="display: flex; align-items: center;">
          <a-input 
            v-decorator="[
              'price',
              {
                initialValue: areaInfo.new_price,
                rules: [{ required: false, pattern: '^([1-9]\\d{0,9}|0)(\\.\\d{1,2})?$', message: '请输入正确价格'}]
              }
            ]"
          />
          <span style="margin-left: 10px;">/h</span>
        </div>
      </a-form-item>
      <a-form-item 
        :labelCol="{ span: 3, offset: 0 }" 
        :wrapper-col="{ span: 3, offset: 0 }">
        <a-button type="primary" html-type="submit">
          确认修改
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data () {
    return {
      form: this.$form.createForm(this, { name: 'coordinated' }),
      areas: [],
      areaInfo: {},
    };
  },
  async created() {
    // 查询区域详情
    const rawData = await this.GetAreaInfo();
    // 区域选择列表
    this.areas = rawData.result && rawData.result.area_list;
    // 区域初始化数据
    this.areaInfo = rawData.result && rawData.result.info;
  },
  methods: {
    ...mapActions(['GetAreaInfo', 'SaveArea']),
    onSubmit(e) {
      e.preventDefault();
      const _this = this;
      this.form.validateFields(async(err, values) => {
        if (!err) {
          const saveInfo = {
            aid: _this.areaInfo.aid,
            title: values.areaName,
            content: values.areaDesc,
            price: values.price,
          };
          // 提交修改数据
          const siData = await _this.SaveArea(saveInfo);
          if (siData.code === 100) {
            _this.$message.success(siData.msg);
            // 刷新
            const rawData = await _this.GetAreaInfo({ aid: saveInfo.aid });
            _this.areas = rawData.result && rawData.result.area_list;
            _this.areaInfo = rawData.result && {
              ...rawData.result.info,
            };
            _this.form.setFieldsValue({
              areaName: '',
              areaDesc: '',
              price: _this.areaInfo.new_price,
            });
          } else {
            _this.$message.error(siData.msg);
          }
        }
      });
    },
    async onSelectChange(value) {
      // 查询新区域
      const rawData = await this.GetAreaInfo({
        aid: value,
      });
      this.areaInfo = rawData.result.info;
      this.form.setFieldsValue({
        areaName: '',
        areaDesc: '',
        price: this.areaInfo.new_price,
      });
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

