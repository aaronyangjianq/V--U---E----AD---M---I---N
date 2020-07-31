<template>
  <div class="recharge-content">
    <div class="title">
      <a-button @click="addDeposit">增加套餐 +</a-button>
    </div>
    <div class="package" v-for="(item,index) in depositList" :key="item.did">
      <div>
        价格{{item.did}}：充
        <a-input style="width: 80px" v-model="item.price" :disabled="!(check === item.did)"  @change="changePrice(item.did, item.price, item.reward)"></a-input>送
        <a-input style="width: 80px" v-model="item.reward" :disabled="!(check === item.did)"  @change="changeReward(item.did, item.price, item.reward)"></a-input>
        <a-button  v-if="!(check === item.did)" @click="edit(item.did)">编辑</a-button>
        <a-button v-if="check === item.did" @click="saveInfo(item.did)">保存修改</a-button>
        <a-button v-if="check === item.did" @click="delDeposit(item, item.did, index)">×</a-button>
      </div>
    </div>
    <a-modal
      title="增加套餐"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    > 
     <div>
      <label>充值金额:</label>
      <a-input style="width: 80px; margin-left: 15px;" v-model="addInfo.price" ></a-input>
      <label  style="margin-left: 5px;">赠送金额:</label>
      <a-input style="width: 80px; margin-left: 15px" v-model="addInfo.reward"></a-input>
     </div>
    </a-modal>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      depositList: [
        {
          did: null,
          price: null,
          reward: null
        }
      ],
      sendInfo: {
        did: null,
        price: null,
        reward: null
      },
      check: null,
      isAdd: false,
      visible: false,
      confirmLoading: false,
      addInfo: {
        price: null,
        reward: null
      }
    };
  },
  async created() {
    const rawData = await this.GetDepositList();
    this.depositList = rawData.result;
  },
  methods: {
    ...mapActions(['GetDepositList', 'AddDeposit', 'DelDeposit', 'SaveDeposit']),
    addDeposit() {
      this.visible = true;
    },
    async delDeposit(item, id, position) {
      const delInfo = {
        did: id
      };
      await this.DelDeposit(delInfo);
      const rawData = await this.GetDepositList();
      this.depositList = rawData.result;
    },
    async saveInfo(id) {
      if(this.sendInfo.did === null) {
        return this.check = !id;
      }
      const saveDepositInfo = this.sendInfo;
      await this.SaveDeposit(saveDepositInfo);
      const rawData = await this.GetDepositList();
      this.depositList = rawData.result;
      this.check = !id;
    },
    changePrice(id, price, reward) {
      this.sendInfo.did = id;
      this.sendInfo.price = price;
      this.sendInfo.reward = reward;
    },
    changeReward(id, price, reward) {
      this.sendInfo.did = id;
      this.sendInfo.price = price;
      this.sendInfo.reward = reward;
    },
    edit(id) {
      this.check = id;
    },
    async handleOk() {
      this.visible = false;
      this.confirmLoading = true;
      const sendAddInfo = this.addInfo;
      await this.AddDeposit(sendAddInfo);
      this.confirmLoading = false;
      this.addInfo = {};
      window.location.reload();
      const rawData = await this.GetDepositList();
      this.depositList = rawData.result;
    },
    handleCancel() {
      this.visible = false;
    }
  }
};
</script>

<style lang="less" scoped>
.recharge-content {
  width: 400px;
  .package {
    .a-input {
      width: 80px;
    }
  }
}
</style>