import { getBannerInfo, upload, addUpload, changeUpload, deleteUpload } from '@/services';

const banner = {
    state: {
      bannerList: [],
      image: ''
    },
  
    mutations: {
      GET_BANNERLIST: (state, { bannerList }) => {
        state.bannerList = bannerList;
      },
      UP_LOAD: (state, image) => {
        state.image = image;
      },
      ADD_UPLOAD: () => {

      },
      CHANGE_UPLOAD: () => {

      },
      DELETE_UPLOAD: () => {

      }
    },
  
    actions: {
      // 轮播图列表
      GetBannerInfo ({ commit }) {
        return new Promise((resolve, reject) => {
            getBannerInfo().then(response => {
            if (response.code === 100) {
              const bannerList = response.result;
              commit('GET_BANNERLIST', bannerList);
              resolve({
                result: bannerList,
              });
            } else {
              this.$message(response.msg);
            }
          }).catch(error => {
            reject(error);
          });
        });
      },
  
      // 上传图片
      Upload ({commit}, imageInfo) {
        return new Promise((resolve, reject) => {
          upload(imageInfo).then(response => {
            if (response.code === 100) {
              const image = response.result.name;
              console.log('image', image);
              commit('UP_LOAD', image);
              resolve({
                result: image,
              });
            } else {
              this.$message(response.msg);
            }
          }).catch(error => {
            reject(error);
          });
        }); 
      },

      // 添加
      AddUpload ({commit}, imageInfo) {
        return new Promise((resolve, reject) => {
          addUpload(imageInfo).then(response => {
            if (response.code === 100) {
              const result = response.result;
              commit('ADD_UPLOAD', result);
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

      // 更换
      ChangeUpload ({commit}, imageInfo) {
        return new Promise((resolve, reject) => {
            changeUpload(imageInfo).then(response => {
            if (response.code === 100) {
              const result = response.result;
              commit('CHANGE_UPLOAD', result);
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

      // 删除
      deleteUpload ({ commit }, imgInfo) {
        return new Promise((resolve, reject) => {
            deleteUpload(imgInfo).then(response => {
            if (response.code === 100) {
              const result = response.result;
              commit('DELETE_UPLOAD', result);
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
  
  export default banner;