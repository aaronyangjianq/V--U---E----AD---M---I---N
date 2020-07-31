import { getPlaceList, updateButton, placeSeat } from '@/services';

const place = {
    state: {
    },
  
    mutations: {
      GET_PLACElIST: () => {
      },
      UPDATE_BUTTON: () => {

      },
      PLACE_SEAT: () => {

      }
    },
  
    actions: {
      // 座位管理
      GetPlaceList ({ commit }, placeInfo) {
        return new Promise((resolve, reject) => {
            getPlaceList(placeInfo).then(response => {
            if (response.code === 100) {
              const result = response.result;
              commit('GET_PLACElIST', result);
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
      // 座位电源开关
      UpdateButton ({ commit }, updateInfo) {
        return new Promise((resolve, reject) => {
            updateButton(updateInfo).then(response => {
            if (response.code === 100) {
              const result = response.result;
              commit('UPDATE_BUTTON', result);
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

      // 预约情况
      PlaceSeat ({ commit }, seatInfo) {
        return new Promise((resolve, reject) => {
            placeSeat(seatInfo).then(response => {
            if (response.code === 100) {
              const result = response.result;
              commit('PLACE_SEAT', result);
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
  
  export default place;