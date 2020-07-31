import { getCouponList, setStatus, addCoupon, saveCoupon, codeverify, passCoupon, nopassCoupon } from '@/services';

const coupon = {
    state: {
      couponList: [],
      codeverifyList: []
    },
  
    mutations: {
      GET_COUPONLIST: (state, { depositList }) => {
        state.depositList = depositList;
      },
      SET_STATUS: () => {

      },
      ADD_COUPON: () => {

      },
      SAVE_COUPON: () => {

      },
      GET_CODEVERIFYLIST: (state, { codeverifyList }) => {
        state.codeverifyList = codeverifyList;
      },
      PASS_COUPON: () => {

      },
      NOPASS_COUPON: () => {

      }
    },
  
    actions: {
      // 卡券列表
      GetCouponList ({ commit }) {
        return new Promise((resolve, reject) => {
            getCouponList().then(response => {
            if (response.code === 100) {
              const couponList = response.result;
              commit('GET_COUPONLIST', couponList);
              resolve({
                result: couponList,
              });
            } else {
              this.$message(response.msg);
            }
          }).catch(error => {
            reject(error);
          });
        });
      },
  
      // 设置状态
      SetStatus ({ commit }, status) {
        return new Promise((resolve, reject) => {
            setStatus(status).then(response => {
            if (response.code === 100) {
              const result = response.result;
              commit('SET_STATUS', result);
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

      // 添加卡券
      AddCoupon ({ commit }, coupon) {
        return new Promise((resolve, reject) => {
            addCoupon(coupon).then(response => {
            if (response.code === 100) {
              const result = response.result;
              commit('ADD_COUPON', result);
            }
            resolve({
              ...response,
            });
          }).catch(error => {
            console.log(error);
            reject(error);
          });
        });
      },

      // 修改保存
      SaveCoupon ({ commit }, saveInfo) {
        return new Promise((resolve, reject) => {
            saveCoupon(saveInfo).then(response => {
            if (response.code === 100) {
              const result = response.result;
              commit('SAVE_COUPON', result);
            }
            resolve({
              ...response,
            });
          }).catch(error => {
            console.log(error);
            reject(error);
          });
        });
      },

      // 兑换码审核列表
      Codeverify ({ commit }, filterInfo) {
        return new Promise((resolve, reject) => {
           codeverify(filterInfo).then(response => {
            if (response.code === 100) {
              const codeverifyList = response.result;
              commit('GET_CODEVERIFYLIST', codeverifyList);
            }
            resolve({
              ...response,
            });
          }).catch(error => {
            console.log(error);
            reject(error);
          });
        });
      },

      // 审核通过
      PassCoupon ({ commit }, passInfo) {
        return new Promise((resolve, reject) => {
          passCoupon(passInfo).then(response => {
           if (response.code === 100) {
             const result = response.result;
             commit('PASS_COUPON', result);
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
      // 审核不通过
      NopassCoupon ({ commit }, passInfo) {
        return new Promise((resolve, reject) => {
          nopassCoupon(passInfo).then(response => {
           if (response.code === 100) {
             const result = response.result;
             commit('NOPASS_COUPON', result);
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
  
  export default coupon;