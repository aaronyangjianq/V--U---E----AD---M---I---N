<template>
  <div class='add-content'>
    <div class='card'>
      <div class='card-top'>
        <a-form :form='form'>
          <a-form-item>
            兑换码类型:
            <a-select default-value='单人区' style='width: 120px' @change='handleChange'>
              <a-select-option value='single'>单人区</a-select-option>
              <a-select-option value='double'>双人区</a-select-option>
            </a-select>
            <a-select default-value='一小时' style='width: 120px' @change='handleChange'>
              <a-select-option value='oneHonor'>一小时</a-select-option>
              <a-select-option value='threeHonor'>三小时</a-select-option>
              <a-select-option value='day'>日卡</a-select-option>
              <a-select-option value='month'>月卡</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item>
            生成兑换码数量:
            <a-input style='width: 90px' placeholder='50'></a-input>
          </a-form-item>
          <a-form-item>
            兑换码有效期:
            <a-date-picker
              v-model='startValue'
              :disabled-date='disabledStartDate'
              show-time
              format='YYYY-MM-DD HH:mm:ss'
              placeholder='2015-05-01'
              @openChange='handleStartOpenChange'
            />到
            <a-date-picker
              v-model='endValue'
              :disabled-date='disabledEndDate'
              show-time
              format='YYYY-MM-DD HH:mm:ss'
              placeholder='2015-05-01'
              :open='endOpen'
              @openChange='handleEndOpenChange'
            />
          </a-form-item>
          <a-form-item>
            兑换码平台:
            <a-input style='width: 90px' placeholder='美团外卖'></a-input>
          </a-form-item>
          <div style='text-align: center'>
            <a-button type='primary'>生成兑换码</a-button>
          </div>
          <br />
          <span class='tip'>清空条件，重新生成</span>
        </a-form>
      </div>
      <div class='card-bottom'>
        <div class='card-add-content'>
          <!-- <textarea name id cols='30' rows='10'>
                      兑换码生成成功
            兑换码编号：005
            兑换码生成时间：2015-12-15  06:45:45
            兑换码类型：单人明区  一小时卡
            兑换数量：50
            兑换码有效期：2015-12-15  到  2015-12-15
            兑换码使用平台：美团外卖
            详细信息在右侧列表中
          </textarea>-->
          <h3 class='title'>兑换码生成成功</h3>
          <p>兑换码编号：005</p>
          <p>兑换码生成时间：2015-12-15 06:45:45</p>
          <p>兑换码类型：单人明区 一小时卡</p>
          <p>兑换数量：50</p>
          <p>兑换码有效期：2015-12-15 到 2015-12-15</p>
          <p>兑换码使用平台：美团外卖</p>
          <a href='#'>详细信息在右侧列表中</a>
        </div>
      </div>
    </div>
    <div class='list-content'>
      <a-table :columns='columns' :data-source='data'>
        <a slot='name' slot-scope='text'>{{ text }}</a>
      </a-table>
    </div>
  </div>
</template>

<script>
const columns = [
  {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
    scopedSlots: { customRender: 'type' }
  },
  {
    title: '兑换码',
    dataIndex: 'conversionCode',
    key: 'conversionCode'
  },
  {
    title: '有效期',
    dataIndex: 'validDate',
    key: 'validDate',
    ellipsis: true
  },
  {
    title: '平台',
    dataIndex: 'platform',
    key: 'platform',
    ellipsis: true
  },
  {
    title: '导出到EXCEL',
    dataIndex: 'exportExcel',
    key: 'exportExcel',
    ellipsis: true
  }
];

const data = [
  {
    key: '1',
    type: '单人明区三小时卡',
    conversionCode: '美团外卖XDDFEEDEFA',
    validDate: '2020-05-09到2020-05-09',
    platform: '美团外卖'
  },
  {
    key: '2',
    type: '单人明区三小时卡',
    conversionCode: '美团外卖XDDFEEDEFA',
    validDate: '2020-05-09到2020-05-09',
    platform: '美团外卖'
  },
  {
    key: '3',
    type: '单人明区三小时卡',
    conversionCode: '美团外卖XDDFEEDEFA',
    validDate: '2020-05-09到2020-05-09',
    platform: '美团外卖'
  }
];
export default {
  layout: false,
  data() {
    return {
      data,
      columns,
      form: {},
      startValue: null,
      endValue: null,
      endOpen: false
    };
  },
  watch: {
    startValue(val) {
      console.log('startValue', val);
    },
    endValue(val) {
      console.log('endValue', val);
    }
  },
  methods: {
    handleChange() {},
    disabledStartDate(startValue) {
      const endValue = this.endValue;
      if (!startValue || !endValue) {
        return false;
      }
      return startValue.valueOf() > endValue.valueOf();
    },
    disabledEndDate(endValue) {
      const startValue = this.startValue;
      if (!endValue || !startValue) {
        return false;
      }
      return startValue.valueOf() >= endValue.valueOf();
    },
    handleStartOpenChange(open) {
      if (!open) {
        this.endOpen = true;
      }
    },
    handleEndOpenChange(open) {
      this.endOpen = open;
    }
  }
};
</script>

<style lang='less' scoped>
.add-content {
  display: flex;
  background-color: #f0f0f0;
  .card {
    width: 600px !important;
    .card-top {
      border: 1px solid #ffffff;
      .tip {
        color: rgb(2, 167, 240);
        display: block;
        text-align: center;
      }
    }
    .card-bottom {
      border: 1px solid #ffffff;
      .card-add-content {
        width: 600px;
      }
    }
  }
  .list-content {
    border: 1px solid #ffffff;
  }
}
</style>