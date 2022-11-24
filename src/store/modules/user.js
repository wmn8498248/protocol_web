import { logout, getMenu } from '@/api/user';
import { removeToken } from '@/utils/auth';
import { resetRouter } from '@/router';

const state = {
  userinfo: {} //存放用户信息
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
          console.log(err);
          reject(err);
        });
      /////////////////////////////////////////上下切换////////////////////////////////////////
      //测试数据data 开发删除
			// let res = {
			// 	code: 0,
			// 	msg: 'success',
			// 	menuList: {
			// 		userinfoEntity: {
			// 			name: 'admin'
			// 		},
			// 		userRouterMenu: [
			// 			{
			// 				redirect: 'noRedirect',
			// 				path: '/compony1', // 可变 值为 '/compony' + 公司id
			// 				component: 'Layout',
			// 				hidden: false,
			// 				meta: {
			// 				  icon: 'compony',
			// 				  title: '网宁夏电力有限公司', // 可变，公司名，
			// 					companyId: 4 // 可变，公司id
			// 				},
			// 				children: [
			// 					{
			// 						path: 'stand1', // 可变 值为 'stand' + 站点id
			// 						component: '/yinchuan/yinchuan',
			// 						hidden: false,
			// 						name: 'yingchuan',
			// 						meta: {
			// 						  icon: 'stand',
			// 						  title: '银川', // 可变， 站点名
			// 							standId: 9 // 可变， 站点id
			// 						},
			// 						children: [
			// 							{
			// 								path: 'bilei',
			// 								component: '/bilei/bilei',
			// 								hidden: false,
			// 								name: 'Bilei',
			// 								meta: {
			// 								  icon: 'sand',
			// 								  title: '避雷器监测',
			// 									companyId: 4, // 可变，公司id
			// 									standId: 9 // 可变，站点id
			// 								}
			// 							},
			// 							{
			// 								path: 'bilei_detail',
			// 								component: '/bilei/bilei_detail',
			// 								hidden: true,
			// 								name: 'Bilei_detail',
			// 								meta: {
			// 								  icon: 'sand',
			// 								  title: '电流详情',
			// 									companyId: 4, // 可变，公司id
			// 									standId: 9 // 可变，站点id
			// 								}
			// 							},
			// 							{
			// 								path: 'qingxie',
			// 								component: '/qingxie/qingxie',
			// 								hidden: false,
			// 								name: 'Qingxie',
			// 								meta: {
			// 								  icon: 'tilt',
			// 								  title: '倾斜监测',
			// 									companyId: 4, // 可变，公司id
			// 									standId: 9 // 可变，站点id
			// 								}
			// 							},
			// 							{
			// 								path: 'qingxie_map',
			// 								component: '/qingxie/qingxie_map',
			// 								hidden: true,
			// 								name: 'Qingxie_map',
			// 								meta: {
			// 								  icon: 'tilt',
			// 								  title: '倾斜监测地图',
			// 									companyId: 4, // 可变，公司id
			// 									standId: 9 // 可变，站点id
			// 								}
			// 							},
			// 							{
			// 								path: 'qingxie_data',
			// 								component: '/qingxie/qingxie_data',
			// 								hidden: true,
			// 								name: 'Qingxie_data',
			// 								meta: {
			// 								  icon: 'tilt',
			// 								  title: '倾角数据图',
			// 									companyId: 4, // 可变，公司id
			// 									standId: 9 // 可变，站点id
			// 								}
			// 							},
			// 							{
			// 								path: 'qingxie_detail',
			// 								component: '/qingxie/qingxie_detail',
			// 								hidden: true,
			// 								name: 'Qingxie_detail',
			// 								meta: {
			// 								  icon: 'tilt',
			// 								  title: '倾斜监测详情',
			// 									companyId: 4, // 可变，公司id
			// 									standId: 9 // 可变，站点id
			// 								}
			// 							},
			// 							{
			// 								path: 'wendu',
			// 								component: '/wendu/wendu',
			// 								hidden: false,
			// 								name: 'Wendu',
			// 								meta: {
			// 								  icon: 'wd',
			// 								  title: '温度电流',
			// 									companyId: 4, // 可变，公司id
			// 									standId: 9 // 可变，站点id
			// 								}
			// 							},
			// 							{
			// 								path: 'wendu_data',
			// 								component: '/wendu/wendu_data',
			// 								hidden: true,
			// 								name: 'Wendu_data',
			// 								meta: {
			// 								  icon: 'wd',
			// 								  title: '温度电流监控图',
			// 									companyId: 4, // 可变，公司id
			// 									standId: 9 // 可变，站点id
			// 								}
			// 							},
			// 							{
			// 								path: 'wendu_map',
			// 								component: '/wendu/wendu_map',
			// 								hidden: true,
			// 								name: 'Wendu_map',
			// 								meta: {
			// 								  icon: 'wd',
			// 								  title: '温度电流监控地图',
			// 									companyId: 4, // 可变，公司id
			// 									standId: 9 // 可变，站点id
			// 								}
			// 							},
			// 							{
			// 								path: 'qiya',
			// 								component: '/qiya/qiya',
			// 								hidden: false,
			// 								name: 'Qiya',
			// 								meta: {
			// 								  icon: 'qy',
			// 								  title: '气压监测',
			// 									companyId: 4, // 可变，公司id
			// 									standId: 9 // 可变，站点id
			// 								}
			// 							},
			// 							{
			// 								path: 'qiya_data',
			// 								component: '/qiya/qiya_data',
			// 								hidden: true,
			// 								name: 'Qiya_data',
			// 								meta: {
			// 								  icon: 'qy',
			// 								  title: '气压监测监控图',
			// 									companyId: 4, // 可变，公司id
			// 									standId: 9 // 可变，站点id
			// 								}
			// 							},
			// 							{
			// 								path: 'shuijin',
			// 								component: '/shuijin/shuijin',
			// 								hidden: false,
			// 								name: 'shuijin',
			// 								meta: {
			// 								  icon: 'water',
			// 								  title: '水浸监测',
			// 									companyId: 4, // 可变，公司id
			// 									standId: 9 // 可变，站点id
			// 								}
			// 							},
			// 							{
			// 								path: 'shuijin_data',
			// 								component: '/shuijin/shuijin_data',
			// 								hidden: true,
			// 								name: 'Shuijin_data',
			// 								meta: {
			// 								  icon: 'water',
			// 								  title: '水浸监测监控图',
			// 									companyId: 4, // 可变，公司id
			// 									standId: 9 // 可变，站点id
			// 								}
			// 							},
			// 							{
			// 								path: 'shuiwei',
			// 								component: '/shuiwei/shuiwei',
			// 								hidden: false,
			// 								name: 'shuiwei',
			// 								meta: {
			// 								  icon: 'water-high',
			// 								  title: '水位监测',
			// 									companyId: 4, // 可变，公司id
			// 									standId: 9 // 可变，站点id
			// 								}
			// 							},
			// 							{
			// 								path: 'shuiwei_data',
			// 								component: '/shuiwei/shuiwei_data',
			// 								hidden: true,
			// 								name: 'Shuiwei_data',
			// 								meta: {
			// 								  icon: 'water-high',
			// 								  title: '水位监测监控图',
			// 									companyId: 4, // 可变，公司id
			// 									standId: 9 // 可变，站点id
			// 								}
			// 							},
			// 							{
			// 								path: 'wenkong',
			// 								component: '/wenkong/wenkong',
			// 								hidden: false,
			// 								name: 'wenkong',
			// 								meta: {
			// 								  icon: 'wendu',
			// 								  title: '温控器监测',
			// 									companyId: 4, // 可变，公司id
			// 									standId: 9 // 可变，站点id
			// 								}
			// 							},
			// 							{
			// 								path: 'wenkong_data',
			// 								component: '/wenkong/wenkong_data',
			// 								hidden: true,
			// 								name: 'Wenkong_data',
			// 								meta: {
			// 								  icon: 'wendu',
			// 								  title: '温控器监测监控图',
			// 									companyId: 4, // 可变，公司id
			// 									standId: 9 // 可变，站点id
			// 								}
			// 							},
			// 							{
			// 								path: 'jishu',
			// 								component: '/jishu/jishu',
			// 								hidden: false,
			// 								name: 'Jishu',
			// 								meta: {
			// 								  icon: 'count',
			// 								  title: '计数器监测',
			// 									companyId: 4, // 可变，公司id
			// 									standId: 9 // 可变，站点id
			// 								}
			// 							},
			// 							{
			// 								path: 'jishu_data',
			// 								component: '/jishu/jishu_data',
			// 								hidden: true,
			// 								name: 'Jishu_data',
			// 								meta: {
			// 								  icon: 'count',
			// 								  title: '计数器监控图',
			// 									companyId: 4, // 可变，公司id
			// 									standId: 9 // 可变，站点id
			// 								}
			// 							},
			// 							{
			// 								path: 'wengan',
			// 								component: '/wengan/wengan',
			// 								hidden: false,
			// 								name: 'Wengan',
			// 								meta: {
			// 								  icon: 'wifi',
			// 								  title: '无线温度传感器',
			// 									companyId: 4, // 可变，公司id
			// 									standId: 9 // 可变，站点id
			// 								}
			// 							},
			// 							{
			// 								path: 'wengan_data',
			// 								component: '/wengan/wengan_data',
			// 								hidden: true,
			// 								name: 'Wengan_data',
			// 								meta: {
			// 								  icon: 'wifi',
			// 								  title: '无线温度传感器监控图',
			// 									companyId: 4, // 可变，公司id
			// 									standId: 9 // 可变，站点id
			// 								}
			// 							},
			// 							{
			// 								path: 'wenshi',
			// 								component: '/wenshi/wenshi',
			// 								hidden: false,
			// 								name: 'Wenshi',
			// 								meta: {
			// 								  icon: 'wifi',
			// 								  title: '温湿度传感器',
			// 									companyId: 4, // 可变，公司id
			// 									standId: 9 // 可变，站点id
			// 								}
			// 							},
			// 							{
			// 								path: 'wenshi_data',
			// 								component: '/wenshi/wenshi_data',
			// 								hidden: true,
			// 								name: 'Wenshi_data',
			// 								meta: {
			// 								  icon: 'wifi',
			// 								  title: '温湿度传感器监控图',
			// 									companyId: 4, // 可变，公司id
			// 									standId: 9 // 可变，站点id
			// 								}
			// 							},
			// 							{
			// 								path: 'shengsuo',
			// 								component: '/shengsuo/shengsuo',
			// 								hidden: false,
			// 								name: 'Shengsuo',
			// 								meta: {
			// 								  icon: 'wifi',
			// 								  title: '无线伸缩节传感器',
			// 									companyId: 4, // 可变，公司id
			// 									standId: 9 // 可变，站点id
			// 								}
			// 							},
			// 							{
			// 								path: 'shengsuo_data',
			// 								component: '/shengsuo/shengsuo_data',
			// 								hidden: true,
			// 								name: 'Shengsuo_data',
			// 								meta: {
			// 								  icon: 'wifi',
			// 								  title: '无线伸缩节传感器监控图',
			// 									companyId: 4, // 可变，公司id
			// 									standId: 9 // 可变，站点id
			// 								}
			// 							},
			// 							{
			// 								path: 'bianxing',
			// 								component: '/bianxing/bianxing',
			// 								hidden: false,
			// 								name: 'Bianxing',
			// 								meta: {
			// 								  icon: 'wifi',
			// 								  title: '无线变形传感器',
			// 									companyId: 4, // 可变，公司id
			// 									standId: 9 // 可变，站点id
			// 								}
			// 							},
			// 							{
			// 								path: 'bianxing_data',
			// 								component: '/bianxing/bianxing_data',
			// 								hidden: true,
			// 								name: 'Bianxing_data',
			// 								meta: {
			// 								  icon: 'wifi',
			// 								  title: '无线变形传感器监控图',
			// 									companyId: 4, // 可变，公司id
			// 									standId: 9 // 可变，站点id
			// 								}
			// 							},
			// 						]
			// 					}
			// 				]
			// 			},
			// 			{
			// 			  path: '/waring',
			// 			  component: 'Layout',
			// 			  children: [
			// 			    {
			// 			      path: 'waring',
			// 			      component: '/waring/waring',
			// 			      name: 'Waring',
			// 			      meta: { title: '传感器报警', icon: 'warn' }
			// 			    }
						  //   {
						  //     path: 'qingxie',
						  //     component: '/qingxie/qingxie_warning',
						  //     name: 'Qingxie_warning',
						  //     meta: { title: '报警数据', icon: 'warn', noCache: true },
			     //       hidden: true
						  //   },
								// {
								//   path: 'wendu',
								//   component: '/wendu/wendu_warning',
								//   name: 'Wendu_warning',
								//   meta: { title: '报警数据', icon: 'warn', noCache: true },
								//  hidden: true
								// },
								// {
								//   path: 'qiya',
								//   component: '/qiya/qiya_warning',
								//   name: 'Qiya_warning',
								//   meta: { title: '报警数据', icon: 'warn', noCache: true },
								//  hidden: true
								// },
								// {
								//   path: 'shuijin',
								//   component: '/shuijin/shuijin_warning',
								//   name: 'Shuijin_warning',
								//   meta: { title: '报警数据', icon: 'warn', noCache: true },
								//  hidden: true
								// },
								// {
								//   path: 'shuiwei',
								//   component: '/shuiwei/shuiwei_warning',
								//   name: 'Shuiwei_warning',
								//   meta: { title: '报警数据', icon: 'warn', noCache: true },
								//  hidden: true
								// }
			// 			  ]
			// 			},
			// 			{
			// 			  path: '/dataAnalysis',
			// 			  component: 'Layout',
			// 			  children: [
			// 			    {
			// 			      path: 'dataAnalysis',
			// 			      component: '/dataAnalysis/dataAnalysis',
			// 			      name: 'DataAnalysis',
			// 			      meta: { title: '数据分析', icon: 'dataAnalysis' }
			// 			    }
			// 			  ]
			// 			},
			// 			{
			// 			  path: '/manage',
			// 			  component: 'Layout',
			// 			  meta: { title: '平台管理', icon: 'menu' },
			// 			  children: [
			// 			    {
			// 			      path: 'site',
			// 			      component: '/manage/site',
			// 			      name: 'Site',
			// 			      meta: { title: '站点管理', icon: 'site' }
			// 			    },
			// 			    {
			// 			      path: 'sensor',
			// 			      component: '/manage/sensor',
			// 			      name: 'Sensor',
			// 			      meta: { title: '传感器管理', icon: 'sensor' }
			// 			    },
			// 			    {
			// 			      path: 'staff',
			// 			      component: '/manage/staff',
			// 			      name: 'Staff',
			// 			      meta: { title: '员工账号管理', icon: 'staff' }
			// 			    },
			// 			    {
			// 			      path: 'manager',
			// 			      component: '/manage/manager',
			// 			      name: 'Manager',
			// 			      meta: { title: '管理员管理', icon: 'staff' }
			// 			    },
			// 					{
			// 					  path: 'staff-edit',
			// 					  component: '/manage/staff-edit',
			// 					  name: 'StaffEdit',
			// 					  meta: { title: '员工账号编辑', icon: 'staff', noCache: true },
			// 						hidden: true
			// 					},
			// 					{
			// 					  path: 'manager-edit',
			// 					  component: '/manage/manager-edit',
			// 					  name: 'ManagerEdit',
			// 					  meta: { title: '管理员编辑', icon: 'staff', noCache: true },
			// 						hidden: true
			// 					},
			// 			    // {
			// 			    //   path: 'system',
			// 			    //   component: '/manage/system',
			// 			    //   name: 'System',
			// 			    //   meta: { title: '系统设置', icon: 'set' }
			// 			    // },
			// 			    {
			// 			      path: 'bilei_edit',
			// 			      component: '/bilei/bilei_edit',
			// 			      name: 'Bilei_edit',
			// 			      meta: { title: '避雷器管理', icon: 'sensor', noCache: true },
			// 			      hidden: true
			// 			    },
			// 			    {
			// 			      path: 'bilei_setting',
			// 			      component: '/bilei/bilei_setting',
			// 			      name: 'Bilei_setting',
			// 			      meta: { title: '避雷器设置', icon: 'sensor' },
			// 			      hidden: true
			// 			    },
			// 			    {
			// 			      path: 'bilei_set',
			// 			      component: '/bilei/bilei_set',
			// 			      name: 'Bilei_set',
			// 			      meta: { title: '避雷器设置', icon: 'sensor' },
			// 			      hidden: true
			// 			    },
			// 			    {
			// 			      path: 'qingxie_edit',
			// 			      component: '/qingxie/qingxie_edit',
			// 			      name: 'Qingxie_edit',
			// 			      meta: { title: '倾斜传感器管理', icon: 'sensor', noCache: true },
			// 			      hidden: true
			// 			    },
			// 			    {
			// 			      path: 'qingxie_setting',
			// 			      component: '/qingxie/qingxie_setting',
			// 			      name: 'Qingxie_setting',
			// 			      meta: { title: '倾斜传感器命令', icon: 'sensor' },
			// 			      hidden: true
			// 			    },
			// 			    {
			// 			      path: 'wendu_edit',
			// 			      component: '/wendu/wendu_edit',
			// 			      name: 'Wendu_edit',
			// 			      meta: { title: '温度电流传感器管理', icon: 'sensor', noCache: true },
			// 			      hidden: true
			// 			    },
			// 			    {
			// 			      path: 'wendu_setting',
			// 			      component: '/wendu/wendu_setting',
			// 			      name: 'Wendu_setting',
			// 			      meta: { title: '温度电流传感器命令', icon: 'sensor' },
			// 			      hidden: true
			// 			    },
			// 			    {
			// 			      path: 'qiya_edit',
			// 			      component: '/qiya/qiya_edit',
			// 			      name: 'Qiya_edit',
			// 			      meta: { title: '气压传感器管理', icon: 'sensor', noCache: true },
			// 			      hidden: true
			// 			    },
			// 			    {
			// 			      path: 'qiya_setting',
			// 			      component: '/qiya/qiya_setting',
			// 			      name: 'Qiya_setting',
			// 			      meta: { title: '气压传感器设置', icon: 'sensor' },
			// 			      hidden: true
			// 			    },
			// 			    {
			// 			      path: 'shuijin_edit',
			// 			      component: '/shuijin/shuijin_edit',
			// 			      name: 'Shuijin_edit',
			// 			      meta: { title: '水浸传感器管理', icon: 'sensor', noCache: true },
			// 			      hidden: true
			// 			    },
			// 			    {
			// 			      path: 'shuijin_setting',
			// 			      component: '/shuijin/shuijin_setting',
			// 			      name: 'Shuijin_setting',
			// 			      meta: { title: '水浸传感器设置', icon: 'sensor' },
			// 			      hidden: true
			// 			    },
			// 			    {
			// 			      path: 'shuiwei_edit',
			// 			      component: '/shuiwei/shuiwei_edit',
			// 			      name: 'Shuiwei_edit',
			// 			      meta: { title: '水位传感器管理', icon: 'sensor', noCache: true },
			// 			      hidden: true
			// 			    },
			// 			    {
			// 			      path: 'shuiwei_setting',
			// 			      component: '/shuiwei/shuiwei_setting',
			// 			      name: 'Shuiwei_setting',
			// 			      meta: { title: '水位传感器设置', icon: 'sensor' },
			// 			      hidden: true
			// 			    },
			// 			    {
			// 			      path: 'wenkong_edit',
			// 			      component: '/wenkong/wenkong_edit',
			// 			      name: 'Wenkong_edit',
			// 			      meta: { title: '温控传感器管理', icon: 'sensor', noCache: true },
			// 			      hidden: true
			// 			    },
			// 			    {
			// 			      path: 'wenkong_setting',
			// 			      component: '/wenkong/wenkong_setting',
			// 			      name: 'Wenkong_setting',
			// 			      meta: { title: '温控传感器设置', icon: 'sensor' },
			// 			      hidden: true
			// 			    },
			// 			    {
			// 			      path: 'jishu_edit',
			// 			      component: '/jishu/jishu_edit',
			// 			      name: 'Jishu_edit',
			// 			      meta: { title: '计数器管理', icon: 'sensor', noCache: true },
			// 			      hidden: true
			// 			    },
			// 			    {
			// 			      path: 'jishu_setting',
			// 			      component: '/jishu/jishu_setting',
			// 			      name: 'Jishu_setting',
			// 			      meta: { title: '计数器命令', icon: 'sensor' },
			// 			      hidden: true
			// 			    },
			// 			    {
			// 			      path: 'wengan_edit',
			// 			      component: '/wengan/wengan_edit',
			// 			      name: 'Wengan_edit',
			// 			      meta: { title: '无线温度传感器管理', icon: 'sensor', noCache: true },
			// 			      hidden: true
			// 			    },
			// 			    {
			// 			      path: 'wengan_setting',
			// 			      component: '/wengan/wengan_setting',
			// 			      name: 'Wengan_setting',
			// 			      meta: { title: '无线温度传感器远程升级', icon: 'sensor' },
			// 			      hidden: true
			// 			    },
			// 			    {
			// 			      path: 'wenshi_edit',
			// 			      component: '/wenshi/wenshi_edit',
			// 			      name: 'Wenshi_edit',
			// 			      meta: { title: '温湿度传感器管理', icon: 'sensor', noCache: true },
			// 			      hidden: true
			// 			    },
			// 			    {
			// 			      path: 'wenshi_setting',
			// 			      component: '/wenshi/wenshi_setting',
			// 			      name: 'Wenshi_setting',
			// 			      meta: { title: '温湿度传感器远程升级', icon: 'sensor' },
			// 			      hidden: true
			// 			    },
			// 			    {
			// 			      path: 'shengsuo_edit',
			// 			      component: '/shengsuo/shengsuo_edit',
			// 			      name: 'Shengsuo_edit',
			// 			      meta: { title: '无线伸缩节传感器管理', icon: 'sensor', noCache: true },
			// 			      hidden: true
			// 			    },
			// 			    {
			// 			      path: 'shengsuo_setting',
			// 			      component: '/shengsuo/shengsuo_setting',
			// 			      name: 'Shengsuo_setting',
			// 			      meta: { title: '无线伸缩节传感器远程升级', icon: 'sensor' },
			// 			      hidden: true
			// 			    },
			// 			    {
			// 			      path: 'bianxing_edit',
			// 			      component: '/bianxing/bianxing_edit',
			// 			      name: 'Bianxing_edit',
			// 			      meta: { title: '无线变形传感器管理', icon: 'sensor', noCache: true },
			// 			      hidden: true
			// 			    },
			// 			    {
			// 			      path: 'bianxing_setting',
			// 			      component: '/bianxing/bianxing_setting',
			// 			      name: 'Bianxing_setting',
			// 			      meta: { title: '无线变形传感器远程升级', icon: 'sensor' },
			// 			      hidden: true
			// 			    }
			// 			  ]
			// 			}
			// 		]
			// 	}
			// }
			// let { userinfoEntity } = res.menuList;
			
			// commit('SET_USERINFO', userinfoEntity); //存入vuex
			// resolve(res.menuList); //返回
			
      
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
