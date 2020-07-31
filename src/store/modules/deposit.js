import { getDepositList, addDeposit, delDeposit, saveDeposit, getDepositRecordList } from '@/services';

const deposit = {
    state: {
      depositList: []
    },
  
    mutations: {
      GET_DEPOSITLIST: (state, { depositList }) => {
        state.depositList = depositList;
      },
      ADD_DEPOSITLIST: () => {

      },
      DEL_DEPOSITLIST: () => {

      },
      SAVE_DEPOSITLIST: () => {

      },
      GET_DEPOSITRECORDLIST: () => {
        
      }
    },
  
    actions: {
      // 充值价格列表
      GetDepositList ({ commit }) {
        return new Promise((resolve, reject) => {
            getDepositList().then(response => {
            if (response.code === 100) {
              const depositList = response.result;
              commit('GET_DEPOSITLIST', depositList);
              resolve({
                result: depositList,
              });
            } else {
              this.$message(response.msg);
            }
          }).catch(error => {
            reject(error);
          });
        });
      },
  
      // 新增
      AddDeposit ({ commit }, deposit) {
        return new Promise((resolve, reject) => {
            addDeposit(deposit).then(response => {
            if (response.code === 100) {
              const result = response.result;
              commit('ADD_DEPOSITLIST', result);
              resolve({
                result: result,
              });
            } else {
              this.$message(response.msg);
            }
          }).catch(error => {
            reject(error);
          });
        });
      },

      // 删除
      DelDeposit ({ commit }, deposit) {
        return new Promise((resolve, reject) => {
            delDeposit(deposit).then(response => {
            if (response.code === 100) {
              const result = response.result;
              commit('DEL_DEPOSITLIST', result);
              resolve({
                result: result,
              });
            } else {
              this.$message(response.msg);
            }
          }).catch(error => {
            reject(error);
          });
        });
      },

      // 修改
      SaveDeposit ({ commit }, deposit) {
        return new Promise((resolve, reject) => {
            saveDeposit(deposit).then(response => {
            if (response.code === 100) {
              const result = response.result;
              commit('SAVE_DEPOSITLIST', result);
              resolve({
                result: result,
              });
            } else {
              this.$message(response.msg);
            }
          }).catch(error => {
            reject(error);
          });
        });
      },

      // 充值记录列表
      GetDepositRecordList ({ commit }, recordInfo) {
        return new Promise((resolve, reject) => {
          getDepositRecordList(recordInfo).then(response => {
          if (response.code === 100) {
            const result = response.result;
            commit('GET_DEPOSITRECORDLIST', result);
            resolve({
              result: result,
            });
          } else {
            this.$message(response.msg);
          }
        }).catch(error => {
          reject(error);
        });
      });
      }
    }
  };
  
  export default deposit;