import { getAreaInfo, saveArea } from '@/services';

const area = {
    state: {
      areaInfo: [],
      saveResult: []
    },
  
    mutations: {
      GET_AREAINFO: (state, { areaInfo }) => {
        state.areaInfo = areaInfo;
      },
      SAVE_AREA: (state, { saveResult }) => {
        state.saveResult = saveResult;
      }
    },
  
    actions: {
      // 区域信息
      GetAreaInfo ({ commit }, areaInfo) {
        return new Promise((resolve, reject) => {
            getAreaInfo(areaInfo).then(response => {
            if (response.code === 100) {
              const areaInfo = response.result;
              commit('GET_AREAINFO', areaInfo);
              resolve({
                result: areaInfo,
              });
            } else {
              this.$message(response.msg);
            }
          }).catch(error => {
            reject(error);
          });
        });
      },
  
      // 修改区域
      SaveArea ({ commit }, areaInfo) {
        return new Promise((resolve, reject) => {
            saveArea(areaInfo).then(response => {
            if (response.code === 100) {
              const saveResult = response.result;
              commit('SAVE_AREA', saveResult);
              resolve({
                code: response.code,
                msg: response.msg,
                result: saveResult,
              });
            } else {
              resolve({
                code: response.code,
                msg: response.msg,
              });
            }
          }).catch(error => {
            console.log(error);
            reject(error);
          });
        });
      }
  
    }
  };
  
  export default area;