import { getOrderList, cancelOrder } from '@/services';

const order = {
    state: {
    },
  
    mutations: {
      GET_ORDERLIST: () => {
      },
    },
  
    actions: {
      // 订单列表
      GetOrderList ({ commit }, orderInfo) {
        return new Promise((resolve, reject) => {
            getOrderList(orderInfo).then(response => {
            if (response.code === 100) {
              const result = response.result;
              commit('GET_ORDERLIST', result);
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

      // 取消订单
      CancelOrder ({ commit }, oInfo) {
        return new Promise((resolve, reject) => {
          cancelOrder(oInfo).then(response => {
            if (response.code === 100) {
              const result = response.result;
              commit('GET_ORDERLIST', result);
            }
            resolve({
              ...response,
            });
          }).catch(error => {
            console.log(error);
            reject(error);
          });
        });
      }
  
    }
  };
  
  export default order;