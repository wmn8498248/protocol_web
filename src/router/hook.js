// 根路由相关的hook 钩子 全局钩子
import router from "./index";
import store from "@/store";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { Message } from "element-ui";
import { getToken } from "@/utils/auth"; // 获取token 从cookie中
import getPageTitle from "@/utils/get-page-title";
// import menuList from "./data.json";

const whiteList = ["/login"]; // 免登陆可进入的页面

router.beforeEach(async (to, from, next) => {
  // 开启进度条
  NProgress.start();
  // 设置页面title
  document.title = getPageTitle(to.meta.title);

  // 决定用户是否已经登录了
  const hasToken = getToken();
  if (hasToken) {
    // 有token
    if (to.path === "/login") {
      // 如果已经登录了，重定向到主页面
      next({ path: "/" });
      console.log(to.path, "to.path");
    } else {
      // next();
      const authRoutes = store.getters.authRoutes; //取到vuex内的权限菜单数据
      //判断有无权限菜单

      if (authRoutes && authRoutes.length > 0) {
        next();
      } else {
        // 如果没有权限菜单则需要接口请求
        try {
          // 通过用token拿到当前用户的权限菜单
          // let { userRouterMenu } = await store.dispatch('user/getInfo');
          // // 生成处理过的权限路由
          console.log(menuList, "menuList______________");
          let menuList = [
            {
              path: "/dataHistory",
              name: "DataHistory",
              component: "Layout",
              hidden: false,
              meta: {
                icon: "chatList",
                title: "历史信息",
                noCache: false,
                standId: null,
                companyId: null,
              },
              alwaysShow: false,
              children: [
                {
                  path: "shuijin_data",
                  name: "Shuijin_data",
                  component: "/shuijin/shuijin_data",
                  hidden: true,
                  meta: {
                    icon: "qy",
                    title: "温湿度传感器监测监控图",
                    noCache: false,
                    standId: 1,
                    companyId: 1,
                  },
                  alwaysShow: false,
                  children: null,
                },
             
                {
                  path: "wenshi_data",
                  name: "Wenshi_data",
                  component: "/wenshi/wenshi_data",
                  hidden: true,
                  meta: {
                    icon: "qy",
                    title: "温湿度传感器监测监控图",
                    noCache: false,
                    standId: 1,
                    companyId: 1,
                  },
                  alwaysShow: false,
                  children: null,
                },
             
                {
                  path: "bianxing_data",
                  name: "Bianxing_data",
                  component: "/bianxing/bianxing_data",
                  hidden: true,
                  meta: {
                    icon: "qy",
                    title: "无线形变传感器监测监控图",
                    noCache: false,
                    standId: 1,
                    companyId: 1,
                  },
                  alwaysShow: false,
                  children: null,
                },

                {
                  path: "shengsuo_data",
                  name: "Shengsuo_data",
                  component: "/shengsuo/shengsuo_data",
                  hidden: true,
                  meta: {
                    icon: "qy",
                    title: "无线伸缩节传感器监测监控图",
                    noCache: false,
                    standId: 1,
                    companyId: 1,
                  },
                  alwaysShow: false,
                  children: null,
                },
                {
                  path: "shengsuo_map",
                  name: "Shengsuo_map",
                  component: "/shengsuo/shengsuo_map",
                  hidden: true,
                  meta: {
                    icon: "qy",
                    title: "无线伸缩节传感器器监测地图",
                    noCache: false,
                    standId: 1,
                    companyId: 1,
                  },
                  alwaysShow: false,
                  children: null,
                },

                {
                  path: "wengan_data",
                  name: "Wengan_data",
                  component: "/wengan/wengan_data",
                  hidden: true,
                  meta: {
                    icon: "qy",
                    title: "无线温度传感器监测监控图",
                    noCache: false,
                    standId: 1,
                    companyId: 1,
                  },
                  alwaysShow: false,
                  children: null,
                },
                {
                  path: "wengan_map",
                  name: "Wengan_map",
                  component: "/wengan/wengan_map",
                  hidden: true,
                  meta: {
                    icon: "qy",
                    title: "无线温度传感器监测地图",
                    noCache: false,
                    standId: 1,
                    companyId: 1,
                  },
                  alwaysShow: false,
                  children: null,
                },
                {
                  path: "qiya_data",
                  name: "Qiya_data",
                  component: "/qiya/qiya_data",
                  hidden: true,
                  meta: {
                    icon: "qy",
                    title: "SF6气体压力监测监控图",
                    noCache: false,
                    standId: 1,
                    companyId: 1,
                  },
                  alwaysShow: false,
                  children: null,
                },
                {
                  path: "qiya_map",
                  name: "Qiya_map",
                  component: "/qiya/qiya_map",
                  hidden: true,
                  meta: {
                    icon: "qy",
                    title: "SF6气体压力监测地图",
                    noCache: false,
                    standId: 1,
                    companyId: 1,
                  },
                  alwaysShow: false,
                  children: null,
                },
                {
                  path: "wenkong_data",
                  name: "Wenkong_data",
                  component: "/wenkong/wenkong_data",
                  hidden: true,
                  meta: {
                    icon: "Wenkong_data",
                    title: "温控器监测监控图",
                    noCache: false,
                    standId: 2,
                    companyId: 1,
                  },
                  alwaysShow: false,
                  children: null,
                },
                {
                  path: "wenkong_map",
                  name: "Wenkong_map",
                  component: "/wenkong/wenkong_map",
                  hidden: true,
                  meta: {
                    icon: "wendu",
                    title: "温控器监测地图",
                    noCache: false,
                    standId: 2,
                    companyId: 1,
                  },
                  alwaysShow: false,
                  children: null,
                },
                {
                  path: "wenkong_data",
                  name: "Wenkong_data",
                  component: "/wenkong/wenkong_data",
                  hidden: true,
                  meta: {
                    icon: "Wenkong_data",
                    title: "温控器监测监控图",
                    noCache: false,
                    standId: 2,
                    companyId: 1,
                  },
                  alwaysShow: false,
                  children: null,
                },
                {
                  path: "wenkong_map",
                  name: "Wenkong_map",
                  component: "/wenkong/wenkong_map",
                  hidden: true,
                  meta: {
                    icon: "wendu",
                    title: "温控器监测地图",
                    noCache: false,
                    standId: 2,
                    companyId: 1,
                  },
                  alwaysShow: false,
                  children: null,
                },
                {
                  path: "dataHistory",
                  name: "dataHistory",
                  component: "/dataHistory/dataHistory",
                  hidden: false,
                  meta: {
                    icon: "chatList",
                    title: "历史信息",
                    noCache: false,
                    standId: null,
                    companyId: null,
                  },
                  alwaysShow: false,
                  children: null,
                },
              ],
            },

            {
              path: "/manage",
              name: "upproject",
              component: "Layout",
              hidden: false,
              meta: {
                icon: "menu",
                title: "平台管理",
                noCache: false,
                standId: null,
                companyId: null,
              },
              alwaysShow: false,
              children: [
                {
                  path: "modify_add",
                  name: "modify_add",
                  component: "/manage/modify-add",
                  hidden: true,
                  meta: {
                    icon: "sensor",
                    title: "批量导入",
                    noCache: true,
                  },
                  alwaysShow: false,
                },
                {
                  path: "site",
                  name: "Site",
                  component: "/manage/site",
                  hidden: false,
                  meta: {
                    icon: "site",
                    title: "网关管理",
                    noCache: false,
                    standId: null,
                    companyId: null,
                  },
                  alwaysShow: false,
                  children: null,
                },
                {
                  path: "sensor",
                  name: "Sensor",
                  component: "/manage/sensor",
                  hidden: false,
                  meta: {
                    icon: "sensor",
                    title: "传感器管理",
                    noCache: false,
                    standId: null,
                    companyId: null,
                  },
                  alwaysShow: false,
                  children: null,
                },
                {
                  path: "staff",
                  name: "Staff",
                  component: "/manage/staff",
                  hidden: false,
                  meta: {
                    icon: "staff",
                    title: "账号管理",
                    noCache: false,
                    standId: null,
                    companyId: null,
                  },
                  alwaysShow: false,
                  children: null,
                },
                {
                  path: "staff-edit",
                  name: "StaffEdit",
                  component: "/manage/staff-edit",
                  hidden: true,
                  meta: {
                    icon: "staff",
                    title: "员工账号编辑",
                    noCache: true,
                    standId: null,
                    companyId: null,
                  },
                  alwaysShow: false,
                  children: null,
                },
                {
                  path: "manager-edit",
                  name: "ManagerEdit",
                  component: "/manage/manager-edit",
                  hidden: true,
                  meta: {
                    icon: "staff",
                    title: "管理员编辑",
                    noCache: true,
                    standId: null,
                    companyId: null,
                  },
                  alwaysShow: false,
                  children: null,
                },
                {
                  path: "bilei_edit",
                  name: "Bilei_edit",
                  component: "/bilei/bilei_edit",
                  hidden: true,
                  meta: {
                    icon: "sensor",
                    title: "避雷器管理",
                    noCache: true,
                    standId: null,
                    companyId: null,
                  },
                  alwaysShow: false,
                  children: null,
                },
                {
                  path: "bilei_setting",
                  name: "Bilei_setting",
                  component: "/bilei/bilei_setting",
                  hidden: true,
                  meta: {
                    icon: "sensor",
                    title: "避雷器设置",
                    noCache: true,
                    standId: null,
                    companyId: null,
                  },
                  alwaysShow: false,
                  children: null,
                },
                {
                  path: "bilei_set",
                  name: "Bilei_set",
                  component: "/bilei/bilei_set",
                  hidden: true,
                  meta: {
                    icon: "sensor",
                    title: "避雷器设置",
                    noCache: true,
                    standId: null,
                    companyId: null,
                  },
                  alwaysShow: false,
                  children: null,
                },
                {
                  path: "qingxie_edit",
                  name: "Qingxie_edit",
                  component: "/qingxie/qingxie_edit",
                  hidden: true,
                  meta: {
                    icon: "sensor",
                    title: "倾斜传感器管理",
                    noCache: true,
                    standId: null,
                    companyId: null,
                  },
                  alwaysShow: false,
                  children: null,
                },
                {
                  path: "qingxie_setting",
                  name: "Qingxie_setting",
                  component: "/qingxie/qingxie_setting",
                  hidden: true,
                  meta: {
                    icon: "sensor",
                    title: "倾斜传感器命令",
                    noCache: true,
                    standId: null,
                    companyId: null,
                  },
                  alwaysShow: false,
                  children: null,
                },
                {
                  path: "wendu_edit",
                  name: "Wendu_edit",
                  component: "/wendu/wendu_edit",
                  hidden: true,
                  meta: {
                    icon: "sensor",
                    title: "温度电流传感器管理",
                    noCache: true,
                    standId: null,
                    companyId: null,
                  },
                  alwaysShow: false,
                  children: null,
                },
                {
                  path: "wendu_setting",
                  name: "Wendu_setting",
                  component: "/wendu/wendu_setting",
                  hidden: true,
                  meta: {
                    icon: "sensor",
                    title: "温度电流传感器命令",
                    noCache: true,
                    standId: null,
                    companyId: null,
                  },
                  alwaysShow: false,
                  children: null,
                },
                {
                  path: "qiya_edit",
                  name: "Qiya_edit",
                  component: "/qiya/qiya_edit",
                  hidden: true,
                  meta: {
                    icon: "sensor", 
                    title: "SF6气体压力监测器管理",
                    noCache: true,
                    standId: null,
                    companyId: null,
                  },
                  alwaysShow: false,
                  children: null,
                },
                {
                  path: "qiya_setting",
                  name: "Qiya_setting",
                  component: "/qiya/qiya_setting",
                  hidden: true,
                  meta: {
                    icon: "sensor",
                    title: "SF6气体压力监测器设置",
                    noCache: true,
                    standId: null,
                    companyId: null,
                  },
                  alwaysShow: false,
                  children: null,
                },
                {
                  path: "shuijin_edit",
                  name: "Shuijin_edit",
                  component: "/shuijin/shuijin_edit",
                  hidden: true,
                  meta: {
                    icon: "sensor",
                    title: "水浸传感器管理",
                    noCache: true,
                    standId: null,
                    companyId: null,
                  },
                  alwaysShow: false,
                  children: null,
                },
                {
                  path: "shuijin_setting",
                  name: "Shuijin_setting",
                  component: "/shuijin/shuijin_setting",
                  hidden: true,
                  meta: {
                    icon: "sensor",
                    title: "水浸传感器设置",
                    noCache: true,
                    standId: null,
                    companyId: null,
                  },
                  alwaysShow: false,
                  children: null,
                },
                {
                  path: "shuiwei_edit",
                  name: "Shuiwei_edit",
                  component: "/shuiwei/shuiwei_edit",
                  hidden: true,
                  meta: {
                    icon: "sensor",
                    title: "水位传感器管理",
                    noCache: true,
                    standId: null,
                    companyId: null,
                  },
                  alwaysShow: false,
                  children: null,
                },
                {
                  path: "shuiwei_setting",
                  name: "Shuiwei_setting",
                  component: "/shuiwei/shuiwei_setting",
                  hidden: true,
                  meta: {
                    icon: "sensor",
                    title: "水位传感器设置",
                    noCache: true,
                    standId: null,
                    companyId: null,
                  },
                  alwaysShow: false,
                  children: null,
                },
                {
                  path: "wenkong_edit",
                  name: "Wenkong_edit",
                  component: "/wenkong/wenkong_edit",
                  hidden: true,
                  meta: {
                    icon: "sensor",
                    title: "温控传感器管理",
                    noCache: true,
                    standId: null,
                    companyId: null,
                  },
                  alwaysShow: false,
                  children: null,
                },
                {
                  path: "wenkong_setting",
                  name: "Wenkong_setting",
                  component: "/wenkong/wenkong_setting",
                  hidden: true,
                  meta: {
                    icon: "sensor",
                    title: "温控传感器设置",
                    noCache: true,
                    standId: null,
                    companyId: null,
                  },
                  alwaysShow: false,
                  children: null,
                },
                {
                  path: "jishu_edit",
                  name: "Jishu_edit",
                  component: "/jishu/jishu_edit",
                  hidden: true,
                  meta: {
                    icon: "sensor",
                    title: "断路器计数器管理",
                    noCache: true,
                    standId: null,
                    companyId: null,
                  },
                  alwaysShow: false,
                  children: null,
                },
                {
                  path: "jishu_setting",
                  name: "Jishu_setting",
                  component: "/jishu/jishu_setting",
                  hidden: true,
                  meta: {
                    icon: "sensor",
                    title: "断路器计数器命令",
                    noCache: true,
                    standId: null,
                    companyId: null,
                  },
                  alwaysShow: false,
                  children: null,
                },
                {
                  path: "wengan_edit",
                  name: "Wengan_edit",
                  component: "/wengan/wengan_edit",
                  hidden: true,
                  meta: {
                    icon: "sensor",
                    title: "无线温度传感器管理",
                    noCache: true,
                    standId: null,
                    companyId: null,
                  },
                  alwaysShow: false,
                  children: null,
                },
                {
                  path: "wengan_setting",
                  name: "Wengan_setting",
                  component: "/wengan/wengan_setting",
                  hidden: true,
                  meta: {
                    icon: "sensor",
                    title: "无线温度传感器远程升级",
                    noCache: true,
                    standId: null,
                    companyId: null,
                  },
                  alwaysShow: false,
                  children: null,
                },
                {
                  path: "wenshi_edit",
                  name: "Wenshi_edit",
                  component: "/wenshi/wenshi_edit",
                  hidden: true,
                  meta: {
                    icon: "sensor",
                    title: "温湿度传感器管理",
                    noCache: true,
                    standId: null,
                    companyId: null,
                  },
                  alwaysShow: false,
                  children: null,
                },
                {
                  path: "wenshi_setting",
                  name: "Wenshi_setting",
                  component: "/wenshi/wenshi_setting",
                  hidden: true,
                  meta: {
                    icon: "sensor",
                    title: "温湿度传感器远程升级",
                    noCache: true,
                    standId: null,
                    companyId: null,
                  },
                  alwaysShow: false,
                  children: null,
                },
                {
                  path: "shengsuo_edit",
                  name: "Shengsuo_edit",
                  component: "/shengsuo/shengsuo_edit",
                  hidden: true,
                  meta: {
                    icon: "sensor",
                    title: "无线伸缩节传感器管理",
                    noCache: true,
                    standId: null,
                    companyId: null,
                  },
                  alwaysShow: false,
                  children: null,
                },
                {
                  path: "shengsuo_setting",
                  name: "Shengsuo_setting",
                  component: "/shengsuo/shengsuo_setting",
                  hidden: true,
                  meta: {
                    icon: "sensor",
                    title: "无线伸缩节传感器远程升级",
                    noCache: true,
                    standId: null,
                    companyId: null,
                  },
                  alwaysShow: false,
                  children: null,
                },
                {
                  path: "bianxing_edit",
                  name: "Bianxing_edit",
                  component: "/bianxing/bianxing_edit",
                  hidden: true,
                  meta: {
                    icon: "sensor",
                    title: "无线变形传感器管理",
                    noCache: true,
                    standId: null,
                    companyId: null,
                  },
                  alwaysShow: false,
                  children: null,
                },
                {
                  path: "bianxing_setting",
                  name: "Bianxing_setting",
                  component: "/bianxing/bianxing_setting",
                  hidden: true,
                  meta: {
                    icon: "sensor",
                    title: "无线变形传感器远程升级",
                    noCache: true,
                    standId: null,
                    companyId: null,
                  },
                  alwaysShow: false,
                  children: null,
                },
              ],
            },
          ];

          const authRoutes = await store.dispatch(
            "permission/generateAuthRouter",
            menuList
          );
          // //动态添加权限路由
          console.log(authRoutes, "authRoutes______");

          router.addRoutes(authRoutes);
          next({ ...to, replace: true }); // 展开...to 传入path是以确保addRoutes是完整的  replace: true 当用户点击浏览器后退按钮时不会一直在同一个页面
        } catch (error) {
          // 移除token，重定向到登录页去重新登录
          await store.dispatch("user/resetToken");
          console.error(error);
          Message.error(error);
          next(`/login`);
        }
      }
    }
  } else {
    // 没有token
    if (whiteList.indexOf(to.path) !== -1) {
      // 在登录白名单中直接
      next();
    } else {
      // 其他无权访问的页面将重定向到登录页面
      next(`/login?redirect=${to.path}`);
    }
  }
  NProgress.done(); // 结束进度条
});

router.afterEach(() => {
  // 完成进度条
  NProgress.done();
});
