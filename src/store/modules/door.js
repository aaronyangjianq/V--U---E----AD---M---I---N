import { openDoorList, opendoor } from '@/services';

const door = {
    state: {
      doorList: []
    },
  
    mutations: {
      GET_DOORLIST: (state, { doorList }) => {
        state.doorList = doorList;
      },
      OPEN_DOOR: () => {

      }
    },
  
    actions: {
      // 开门列表
      OpenDoorList ({ commit }, doorInfo) {
        return new Promise((resolve, reject) => {
            openDoorList(doorInfo).then(response => {
            if (response.code === 100) {
              const doorList = response.result;
              commit('GET_DOORLIST', doorList);
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

      // 点击开门
      Opendoor ({ commit }) {
        return new Promise((resolve, reject) => {
            opendoor().then(response => {
            if (response.code === 100) {
              const result = response.result;
              commit('OPEN_DOOR', result);
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
  
  export default door;