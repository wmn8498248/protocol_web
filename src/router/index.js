import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

/* Layout */
import Layout from "@/layout/index.vue";

/* 路由模块 */
// import test from './modules/test';
/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面(默认 false)
 * alwaysShow: true               设置true，一直显示根路由
 *                                路由下面的children声明的路由大于1个时，自动回变成嵌套模式-组件页面
 *                                只有一个时，会将那个子路由当做跟路由显示在侧边栏-如引导页面
 * redirect: noRedirect           当设置 noRedirect 的时候该路由在面包屑导航中不可被点击， 'xx'重定向地址，在面包屑中点击会重定向去的地址
 * name:'router-name'             设置路由的名字，一定要填写不然使用<keep-alive>会出现各种问题
 * meta : {
    title: 'title'               设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'             设置该路由的图标
    noCache: true                设置为true，不会被 <keep-alive> 缓存（默认false）  【需要页面填写name和路由的name一致】
    affix: true                  设置为true, 标签会被固定在tags-view
    breadcrumb: false            如果设置为false，则不会在breadcrumb面包屑中展示(默认 true)
    activeMenu: '/example/list'  如果设置了path，侧边栏高亮就是你设置的
 
  }
 */

// 常量路由
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/front/Login"),
    hidden: true,
  },
  {
    path: "/404",
    component: () => import("@/views/error-page/404"),
    hidden: true,
  },
  {
    path: "/401",
    component: () => import("@/views/error-page/401"),
    hidden: true,
  },
  {
    path: "/test1",
    component: () => import("@/views/dashboard/index"),
    hidden: true,
  },
  {
    path: "/",
    // redirect: "/indexHome",
    redirect: "/indexHome",
    component: () => import("@/views/dashboard/indexHome"),
    children: [
      {
        path: "indexHome",
        name: "indexHome",
        meta: {
          title: "大屏监控",
          icon: "screen",
          // affix: true,
        },
        hidden: true,
        // hidden: true
      },
      {
        path: "/temp/mix",
        component: () => import("@/views/temp/mix"),
        name: "Temp_mix",
        meta: { title: "数据详情", icon: "theme" },
        hidden: true,
      },
      {
        path: "/temp/alarmList",
        component: () => import("@/views/temp/alarmList"),
        name: "Temp_alarmList",
        meta: { title: "数据详情", icon: "theme" },
        hidden: true,
      },
      {
        path: "/temp/temp_data",
        component: () => import("@/views/wenduyg/wendu_data"),
        name: "Wenduyg_data_sf6",
        meta: {
          icon: "theme",
          title: "监测监控图",
        },  
        hidden: true,
      },


      {
        path: "/ec/dianliu_data",
        component: () => import("@/views/dianliu/dianliu_data"),
        name: "Dianliu_data_sf6",
        meta: {
          icon: "theme",
          title: "监测监控图",
        },  
        hidden: true,
      },

      {
        path: "/ec/mix",
        component: () => import("@/views/ec/mix"),
        name: "Ec_mix",
        meta: { title: "数据详情", icon: "theme" },
        hidden: true,
      },
      {
        path: "/ec/alarmList",
        component: () => import("@/views/ec/alarmList"),
        name: "Ec_alarmList",
        meta: { title: "数据详情", icon: "theme" },
        hidden: true,
      },

      {
        path: "/sf6/qiya_data",
        component: () => import("@/views/qiya/qiya_data"),
        name: "Qiya_data_sf6",
        meta: {
          icon: "theme",
          title: "监测监控图",
        },  
        hidden: true,
      },

      {
        path: "/sf6/mix",
        component: () => import("@/views/sf6/mix"),
        name: "sf6_mix",
        meta: { title: "数据详情", icon: "theme" },
        hidden: true,
      },

      {
        path: "/sf6/alarmList",
        component: () => import("@/views/sf6/alarmList"),
        name: "alarmList",
        meta: { title: "数据详情", icon: "theme" },
        hidden: true,
      },
      {
        path: "/sf6/alarmType",
        component: () => import("@/views/sf6/alarmType"),
        name: "alarmType",
        meta: { title: "设备报警", icon: "theme" },
        hidden: true,
      },
      {
        path: "/sf6/equipmentType",
        component: () => import("@/views/sf6/equipmentType"),
        name: "equipmentType",
        meta: { title: "设备类型", icon: "theme" },
        hidden: true,
      },
      {
        path: "/sf6/grade",
        component: () => import("@/views/sf6/grade"),
        name: "grade",
        meta: { title: "电压等级", icon: "theme" },
        hidden: true,
      },
      {
        path: "/sf6/quantity",
        component: () => import("@/views/sf6/quantity"),
        name: "quantity",
        meta: { title: "设备数量", icon: "theme" },
        hidden: true,
      },

      {
        path: "/wi/shuijin_data_wi",
        component: () => import("@/views/shuijin/shuijin_data"),
        name: "Shuijin_data_wi",
        meta: {
          icon: "theme",
          title: "监测监控图",
        },
        hidden: true,
      },

      {
        path: "/wi/mix",
        component: () => import("@/views/wi/mix"),
        name: "wi_mix",
        meta: { title: "数据详情", icon: "theme" },
        hidden: true,
      },
      {

        path: "/wi/alarmList",
        component: () => import("@/views/wi/alarmList"),
        name: "tcAlarmList",
        meta: { title: "数据详情", icon: "theme" },
        hidden: true,
      },
      {
        path: "/wi/alarmType",
        component: () => import("@/views/wi/alarmType"),
        name: "thAlarmType",
        meta: { title: "设备报警", icon: "theme" },
        hidden: true,
      },
      {
        path: "/wi/equipmentType",
        component: () => import("@/views/wi/equipmentType"),
        name: "thEquipmentType",
        meta: { title: "设备类型", icon: "theme" },
        hidden: true,
      },
      {
        path: "/wi/grade",
        component: () => import("@/views/wi/grade"),
        name: "thGrade",
        meta: { title: "电压等级", icon: "theme" },
        hidden: true,
      },
      {
        path: "/wi/quantity",
        component: () => import("@/views/wi/quantity"),
        name: "thQuantity",
        meta: { title: "设备数量", icon: "theme" },
        hidden: true,
      },

      {
        path: "/tc/mix",
        component: () => import("@/views/tc/mix"),
        name: "tc_mix",
        meta: {
          icon: "theme",
          title: "数据详情",
        },
        hidden: true,
      },

      {
        path: "/tc/wenkong_data_tc",
        component: () => import("@/views/wenkong/wenkong_data"),
        name: "Wengan_data_tc",
        meta: {
          icon: "theme",
          title: "监测监控图",
        },
        hidden: true,
      },

      {
        path: "/tc/alarmList",
        component: () => import("@/views/tc/alarmList"),
        name: "tcAlarmList",
        meta: { title: "数据详情", icon: "theme" },
        hidden: true,
      },
      {
        path: "/tc/alarmType",
        component: () => import("@/views/tc/alarmType"),
        name: "tcAlarmType",
        meta: { title: "设备报警", icon: "theme" },
        hidden: true,
      },
      {
        path: "/tc/equipmentType",
        component: () => import("@/views/tc/equipmentType"),
        name: "tcEquipmentType",
        meta: { title: "设备类型", icon: "theme" },
        hidden: true,
      },
      {
        path: "/tc/grade",
        component: () => import("@/views/tc/grade"),
        name: "tcGrade",
        meta: { title: "电压等级", icon: "theme" },
        hidden: true,
      },
      {
        path: "/tc/quantity",
        component: () => import("@/views/tc/quantity"),
        name: "tcQuantity",
        meta: { title: "设备数量", icon: "theme" },
        hidden: true,
      },

      {
        path: "/th/wenshi_data_th",
        component: () => import("@/views/wenshi/wenshi_data"),
        name: "Wenshi_data_th",
        meta: {
          icon: "theme",
          title: "监测监控图",
        },
        hidden: true,
      },

      {
        path: "/th/mix",
        component: () => import("@/views/th/mix"),
        name: "th_mix",
        meta: { title: "数据详情", icon: "theme" },
        hidden: true,
      },

      {
        path: "/th/alarmList",
        component: () => import("@/views/th/alarmList"),
        name: "tcAlarmList",
        meta: { title: "数据详情", icon: "theme" },
        hidden: true,
      },
      {
        path: "/th/alarmType",
        component: () => import("@/views/th/alarmType"),
        name: "thAlarmType",
        meta: { title: "设备报警", icon: "theme" },
        hidden: true,
      },
      {
        path: "/th/equipmentType",
        component: () => import("@/views/th/equipmentType"),
        name: "thEquipmentType",
        meta: { title: "设备类型", icon: "theme" },
        hidden: true,
      },
      {
        path: "/th/grade",
        component: () => import("@/views/th/grade"),
        name: "thGrade",
        meta: { title: "电压等级", icon: "theme" },
        hidden: true,
      },
      {
        path: "/th/quantity",
        component: () => import("@/views/th/quantity"),
        name: "thQuantity",
        meta: { title: "设备数量", icon: "theme" },
        hidden: true,
      },

      {
        path: "/bt/wengan_data",
        component: () => import("@/views/wengan/wengan_data"),
        name: "Wengan_data_bt",
        meta: {
          icon: "theme",
          title: "监测监控图",
        },
        hidden: true,
      },

      {
        path: "/bt/mix",
        component: () => import("@/views/bt/mix"),
        name: "bt_mix",
        meta: {
          icon: "theme",
          title: "监测监控图",
        },
        hidden: true,
      },

      {
        path: "/bt/alarmList",
        component: () => import("@/views/bt/alarmList"),
        name: "btAlarmList",
        meta: { title: "数据详情", icon: "theme" },
        hidden: true,
      },
      {
        path: "/bt/alarmType",
        component: () => import("@/views/bt/alarmType"),
        name: "btAlarmType",
        meta: { title: "设备报警", icon: "theme" },
        hidden: true,
      },
      {
        path: "/bt/equipmentType",
        component: () => import("@/views/bt/equipmentType"),
        name: "btEquipmentType",
        meta: { title: "设备类型", icon: "theme" },
        hidden: true,
      },
      {
        path: "/bt/grade",
        component: () => import("@/views/bt/grade"),
        name: "btGrade",
        meta: { title: "电压等级", icon: "theme" },
        hidden: true,
      },
      {
        path: "/bt/quantity",
        component: () => import("@/views/bt/quantity"),
        name: "btQuantity",
        meta: { title: "设备数量", icon: "theme" },
        hidden: true,
      },
      // ——————————————————————
      {
        path: "/btOffset/shengsuo_data_offset",
        component: () => import("@/views/shengsuo/shengsuo_data"),
        name: "Shengsuo_data_offset",
        meta: {
          icon: "theme",
          title: "监测监控图",
        },
        hidden: true,
      },

      {
        path: "/btOffset/mix",
        component: () => import("@/views/btOffset/mix"),
        name: "btOffset_mix",
        meta: { title: "数据详情", icon: "theme" },
        hidden: true,
      },

      {
        path: "/btOffset/alarmList",
        component: () => import("@/views/btOffset/alarmList"),
        name: "btOffsetAlarmList",
        meta: { title: "数据详情", icon: "theme" },
        hidden: true,
      },
      {
        path: "/btOffset/alarmType",
        component: () => import("@/views/btOffset/alarmType"),
        name: "btOffsetAlarmType",
        meta: { title: "设备报警", icon: "theme" },
        hidden: true,
      },
      {
        path: "/btOffset/equipmentType",
        component: () => import("@/views/btOffset/equipmentType"),
        name: "btOffsetEquipmentType",
        meta: { title: "设备类型", icon: "theme" },
        hidden: true,
      },
      {
        path: "/btOffset/grade",
        component: () => import("@/views/btOffset/grade"),
        name: "btOffsetGrade",
        meta: { title: "电压等级", icon: "theme" },
        hidden: true,
      },
      {
        path: "/btOffset/quantity",
        component: () => import("@/views/btOffset/quantity"),
        name: "btOffsetQuantity",
        meta: { title: "设备数量", icon: "theme" },
        hidden: true,
      },
      // ————————————————————————————
      {
        path: "/btStrain/bianxing_data_strain",
        component: () => import("@/views/bianxing/bianxing_data"),
        name: "Bianxing_data_strain",
        meta: {
          icon: "theme",
          title: "监测监控图",
        },
        hidden: true,
      },

      {
        path: "/btStrain/mix",
        component: () => import("@/views/btStrain/mix"),
        name: "btStrain_mix",
        meta: { title: "数据详情", icon: "theme" },
        hidden: true,
      },

      {
        path: "/btStrain/alarmList",
        component: () => import("@/views/btStrain/alarmList"),
        name: "btStrainAlarmList",
        meta: { title: "数据详情", icon: "theme" },
        hidden: true,
      },
      {
        path: "/btStrain/alarmType",
        component: () => import("@/views/btStrain/alarmType"),
        name: "btStrainAlarmType",
        meta: { title: "设备报警", icon: "theme" },
        hidden: true,
      },
      {
        path: "/btStrain/equipmentType",
        component: () => import("@/views/btStrain/equipmentType"),
        name: "btStrainEquipmentType",
        meta: { title: "设备类型", icon: "theme" },
        hidden: true,
      },
      {
        path: "/btStrain/grade",
        component: () => import("@/views/btStrain/grade"),
        name: "btStrainGrade",
        meta: { title: "电压等级", icon: "theme" },
        hidden: true,
      },
      {
        path: "/btStrain/quantity",
        component: () => import("@/views/btStrain/quantity"),
        name: "btStrainQuantity",
        meta: { title: "设备数量", icon: "theme" },
        hidden: true,
      },
      // ————————————————————————————

      {
        path: "/df/bianxing_data_df",
        component: () => import("@/views/bianxing/bianxing_data"),
        name: "Bianxing_data_df",
        meta: {
          icon: "theme",
          title: "监测监控图",
        },
        hidden: true,
      },

      {
        path: "/df/alarmList",
        component: () => import("@/views/df/alarmList"),
        name: "tcAlarmList",
        meta: { title: "数据详情", icon: "theme" },
        hidden: true,
      },
      {
        path: "/df/alarmType",
        component: () => import("@/views/df/alarmType"),
        name: "tcAlarmType",
        meta: { title: "设备报警", icon: "theme" },
        hidden: true,
      },
      {
        path: "/df/equipmentType",
        component: () => import("@/views/df/equipmentType"),
        name: "tcEquipmentType",
        meta: { title: "设备类型", icon: "theme" },
        hidden: true,
      },
      {
        path: "/df/grade",
        component: () => import("@/views/df/grade"),
        name: "tcGrade",
        meta: { title: "电压等级", icon: "theme" },
        hidden: true,
      },
      {
        path: "/df/quantity",
        component: () => import("@/views/df/quantity"),
        name: "tcQuantity",
        meta: { title: "设备数量", icon: "theme" },
        hidden: true,
      },
    ],
  },
  {
    path: "/lz",
    // redirect: "/indexHome",
    component: () => import("@/views/dashboard/currentIndex"),
    children: [
      {
        path: "currentIndex",
        // component: () => import('@/views/dashboard/test'),
        name: "currentIndex",
        // meta: { title: "灵州-大屏监控", icon: "screen", affix: true },
        hidden: true,
      },
      {
        path: "/lz/index2",
        component: () => import("@/views/dashboard/currentIndex/first/index2"),
        name: "currentIndex2",
        // meta: { title: '数据详情', icon: 'theme' },
        hidden: true,
      },
      {
        path: "/lz/equipmentEdit",
        component: () =>
          import("@/views/dashboard/currentIndex/first/equipmentEdit"),
        name: "equipmentEdit",
        // meta: { title: '数据详情', icon: 'theme' },
        hidden: true,
      },
    ],
  },
  // {
  //   path: "/",
  //   component: Layout,
  //   redirect: "/yg/indexHome",
  //   children: [
  //     {
  //       path: "test",
  //       component: () => import("@/views/dashboard/test"),
  //       name: "test",
  //       meta: { title: "大屏监控", icon: "screen", affix: true },
  //       hidden: true,
  //     }
  //   ],
  // },
  /**** 开发使用 最终以接口返回 ***/
  // test
  // { path: '*', redirect: '/404', hidden: true } //开发使用
];

const createRouter = () =>
  new Router({
    mode: "hash", // 'history'服务器需要配置
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

// router.beforeEach((to, from, next) => {
//   // console.log(store.state.user.userinfo.userName == "admin", "___________to");
//   // console.log(to.fullPath, "___________to");
//   next();

//   if (store.state.user.userinfo.userName == "admin") {
//     // 通过vuex state获取当前的token是否存在
//     // next({
//     //   path: "/indexHome/indexHome",
//     //   // query: { redirect: to.fullPath }, // 将跳转的路由path作为参数，登录成功后跳转到该路由
//     // });
//   } else {
//     // next();
//   }
//   // if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限

//   // }
//   // else {
//   //     next();
//   // }
// });

export default router;
