import { logout, getMenu } from '@/api/user';
import { removeToken } from '@/utils/auth';
import { resetRouter } from '@/router';

const state = {
  userinfo:  {} //存放用户信息
};

const mutations = {
  SET_USERINFO: (state, userinfo) => {
    state.userinfo = userinfo;
  }
};

const actions = {
  // 用户登录
  // login({ commit }, userInfo) {
  //   return new Promise((resolve, reject) => {
  //     loginByPassword({ loginAdmin: '810567505@qq.com', password: '12345678' })
  //       .then(response => {
  //         const { data } = response;

  //         setToken(data);
  //         resolve();
  //       })
  //       .catch(error => {
  //         reject(error);
  //       });
  //   });
  // },

  // 获取用户信息和权限菜单
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getMenu()
        .then(res => {
					let { userinfoEntity } = res.menuList;
					commit('SET_USERINFO', userinfoEntity); //存入vuex
					resolve(res.menuList); //返回
        })
        .catch(err => {
          reject(err);
        });
      /////////////////////////////////////////上下切换////////////////////////////////////////
      //测试数据data 开发删除
      
      //********************************************************************************************/
    });
  },

  // 用户退出
  logout({ dispatch }) {
    return new Promise((resolve, reject) => {
      logout()
        .then(() => {
          try {
            removeToken(); // 移除token***
            resetRouter(); // 移除路由***

            dispatch('permission/clearAuthRouter', [], { root: true }); //清空权限路由菜单
            dispatch('tagsView/delAllViews', null, { root: true }); //清空标签和缓存

            resolve();
          } catch (error) {
            console.error(error);
            reject(error);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // 移除token
  resetToken() {
    return new Promise(resolve => {
      removeToken(); // 移除token
      resetRouter(); // 移除路由

      resolve();
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
