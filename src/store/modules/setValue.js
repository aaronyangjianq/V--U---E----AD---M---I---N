import { settingCoupontime, savCoupontime, settingPhone, savephone } from '@/services';

const setValue = {
    state: {
      hour: null,
      phone: null
    },
  
    mutations: {
      GET_HOUR: (state, { hour }) => {
        state.hour = hour;
      },
      SET_HOUR: () => {

      },
      GET_PHONE: (state, { phone }) => {
        state.phone = phone;
      },
      SET_PHONE: () => {

      }
    },
  
    actions: {
      // 兑换时长
      GetHour ({ commit }) {
        return new Promise((resolve, reject) => {
            settingCoupontime().then(response => {
            if (response.code === 100) {
              const hour = response.result.hour;
              commit('GET_HOUR', hour);
              resolve({
                result: hour,
              });
            } else {
              this.$message(response.msg);
            }
          }).catch(error => {
            reject(error);
          });
        });
      },
      
  
      // 设置兑换时长
      SetHour ({ commit }, setHour) {
        return new Promise((resolve, reject) => {
            savCoupontime(setHour).then(response => {
            if (response.code === 100) {
              const result = response.result;
              commit('SET_HOUR', result);
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

      // 商家电话
      GetPhone ({ commit }) {
        return new Promise((resolve, reject) => {
            settingPhone().then(response => {
            if (response.code === 100) {
              const phone = response.result.phone;
              commit('GET_PHONE', phone);
              resolve({
                result: phone,
              });
            } else {
              this.$message(response.msg);
            }
          }).catch(error => {
            reject(error);
          });
        });
      },

      // 修改电话
      SetPhone ({ commit }, setPhone) {
        return new Promise((resolve, reject) => {
            savephone(setPhone).then(response => {
            if (response.code === 100) {
              const result = response.result;
              commit('SET_PHONE', result);
              resolve({
                result: result,
              });
            } resolve({
              ...response,
            });
          }).catch(error => {
            console.log(error);
            reject(error);
          });
        });
      },
    }
  };
  
  export default setValue;