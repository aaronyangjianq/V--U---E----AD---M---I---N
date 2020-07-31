import { getUserList, getUserCoupons, getUserRecord } from '@/services';

const users = {
    state: {
      usersList: [],
      userCoupons: [],
      userRecord: []
    },
  
    mutations: {
      GET_USERLIST: (state, { usersList }) => {
        state.usersList = usersList;
      },
      Get_USERCOUPONS: (state, { userCoupons }) => {
        state.userCoupons = userCoupons;
      },
      Get_USERRECORD: (state, { userRecord }) => {
        state.userRecord = userRecord;
      }
    },
  
    actions: {
      // 用户列表
      GetUserList ({ commit }, userquery) {
        return new Promise((resolve, reject) => {
            getUserList(userquery).then(response => {
            if (response.code === 100) {
              const userList = response.result;
              commit('GET_USERLIST', userList);
              resolve({
                result: userList,
              });
            } else {
              this.$message(response.msg);
            }
          }).catch(error => {
            reject(error);
          });
        });
      },
  
      // 用户卡券
      GetUserCoupons ({ commit }, coupon) {
        return new Promise((resolve, reject) => {
            getUserCoupons(coupon).then(response => {
            if (response.code === 100) {
              const userCoupons = response.result;
              commit('Get_USERRECORD', userCoupons);
              resolve({
                result: userCoupons,
              });
            } else {
              this.$message(response.msg);
            }
          }).catch(error => {
            reject(error);
          });
        });
      },
  
      // 打卡记录
      GetUserRecord ({ commit }, record) {
        return new Promise((resolve, reject) => {
            getUserRecord(record).then(response => {
            if (response.code === 100) {
              const userRecord = response.result;
              commit('GET_USERLIST', userRecord);
              resolve({
                result: userRecord,
              });
            } else {
              this.$message(response.msg);
            }
          }).catch(error => {
            reject(error);
          });
        });
      }
    },
  };
  
  export default users;