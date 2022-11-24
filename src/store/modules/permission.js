import router from '@/router';
import { formatRouter } from '@/router/format'; //格式路由菜单;

const state = {
  btnList: [], //所有的按钮权限
  authRoutes: [] //用户权限 动态路由菜单
};

const mutations = {
  SET_AUTH_ROUTES: (state, authRoutes) => {
    state.authRoutes = authRoutes;
  }
};

const actions = {
  //生成用户权限 的路由
  generateAuthRouter({ commit }, menuEntities) {
    return new Promise(resolve => {
      
      const _routes = [];
      if (menuEntities) _routes.push(...formatRouter(menuEntities)); //判断不为空并格式化后传入

      _routes.push({ path: '*', redirect: '/404', hidden: false }); // 404 页面必须放在最后
      console.log(_routes, "....")

      commit('SET_AUTH_ROUTES', [...router.options.routes, ..._routes]); //把现有的权限路由+静态路由，添加到vuex菜单里
      console.log(_routes, "....")

      resolve(_routes); //返出addRoutes需要的路由
    });
  },
  //清除 权限路由
  clearAuthRouter({ commit }, authRoutes) {
    commit('SET_AUTH_ROUTES', authRoutes);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
