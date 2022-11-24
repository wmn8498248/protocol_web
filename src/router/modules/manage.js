// import Layout from '@/views/dashboard/indexHome';
import Layout from '@/layout/index.vue';
export default {
  path: '/manage',
  component: Layout,
  meta: { title: '平台管理', icon: 'theme' },
  children: [
    {
      path: 'site',
      component: () => import('@/views/manage/site'),
      name: 'Site',
      meta: { title: '站点管理', icon: 'theme' }
    },
    {
      path: 'sensor',
      component: () => import('@/views/manage/sensor'),
      name: 'Sensor',
      meta: { title: '传感器管理', icon: 'theme' }
    },
    {
      path: 'staff',
      component: () => import('@/views/manage/staff'),
      name: 'Staff',
      meta: { title: '员工账号管理', icon: 'theme' }
    },
    {
      path: 'manager',
      component: () => import('@/views/manage/manager'),
      name: 'Manager',
      meta: { title: '管理员管理', icon: 'theme' }
    },
    // {
    //   path: 'system',
    //   component: () => import('@/views/manage/system'),
    //   name: 'System',
    //   meta: { title: '系统设置', icon: 'theme' }
    // },
    {
      path: 'bilei_edit',
      component: () => import('@/views/bilei/bilei_edit'),
      name: 'Bilei_edit',
      meta: { title: '避雷器修改', icon: 'theme' },
      hidden: true
    },
    {
      path: 'bilei_setting',
      component: () => import('@/views/bilei/bilei_setting'),
      name: 'Bilei_setting',
      meta: { title: '避雷器设置', icon: 'theme' },
      hidden: true
    },
    {
      path: 'bilei_set',
      component: () => import('@/views/bilei/bilei_set'),
      name: 'Bilei_set',
      meta: { title: '避雷器设置', icon: 'theme' },
      hidden: true
    },
    {
      path: 'qingxie_edit',
      component: () => import('@/views/qingxie/qingxie_edit'),
      name: 'Qingxie_edit',
      meta: { title: '倾斜传感器修改', icon: 'theme' },
      hidden: true
    },
    {
      path: 'qingxie_setting',
      component: () => import('@/views/qingxie/qingxie_setting'),
      name: 'Qingxie_setting',
      meta: { title: '倾斜传感器命令', icon: 'theme' },
      hidden: true
    },
    {
      path: 'wendu_edit',
      component: () => import('@/views/wendu/wendu_edit'),
      name: 'Wendu_edit',
      meta: { title: '温度电流传感器修改', icon: 'theme' },
      hidden: true
    },
    {
      path: 'wendu_setting',
      component: () => import('@/views/wendu/wendu_setting'),
      name: 'Wendu_setting',
      meta: { title: '温度电流传感器命令', icon: 'theme' },
      hidden: true
    },
    {
      path: 'qiya_edit',
      component: () => import('@/views/qiya/qiya_edit'),
      name: 'Qiya_edit',
      meta: { title: '气压传感器修改', icon: 'theme' },
      hidden: true
    },
    {
      path: 'qiya_setting',
      component: () => import('@/views/qiya/qiya_setting'),
      name: 'Qiya_setting',
      meta: { title: '气压传感器设置', icon: 'theme' },
      hidden: true
    },
    {
      path: 'shuijin_edit',
      component: () => import('@/views/shuijin/shuijin_edit'),
      name: 'Shuijin_edit',
      meta: { title: '水浸传感器修改', icon: 'theme' },
      hidden: true
    },
    {
      path: 'shuijin_setting',
      component: () => import('@/views/shuijin/shuijin_setting'),
      name: 'Shuijin_setting',
      meta: { title: '水浸传感器设置', icon: 'theme' },
      hidden: true
    },
    {
      path: 'shuiwei_edit',
      component: () => import('@/views/shuiwei/shuiwei_edit'),
      name: 'Shuiwei_edit',
      meta: { title: '水位传感器修改', icon: 'theme' },
      hidden: true
    },
    {
      path: 'shuiwei_setting',
      component: () => import('@/views/shuiwei/shuiwei_setting'),
      name: 'Shuiwei_setting',
      meta: { title: '水位传感器设置', icon: 'theme' },
      hidden: true
    },
    {
      path: 'wenkong_edit',
      component: () => import('@/views/wenkong/wenkong_edit'),
      name: 'Wenkong_edit',
      meta: { title: '温控传感器修改', icon: 'theme' },
      hidden: true
    },
    {
      path: 'wenkong_setting',
      component: () => import('@/views/wenkong/wenkong_setting'),
      name: 'Wenkong_setting',
      meta: { title: '温控传感器设置', icon: 'theme' },
      hidden: true
    },
    {
      path: 'jishu_edit',
      component: () => import('@/views/jishu/jishu_edit'),
      name: 'Jishu_edit',
      meta: { title: '计数器修改', icon: 'theme' },
      hidden: true
    },
    {
      path: 'jishu_setting',
      component: () => import('@/views/jishu/jishu_setting'),
      name: 'Jishu_setting',
      meta: { title: '计数器命令', icon: 'theme' },
      hidden: true
    },
    {
      path: 'wengan_edit',
      component: () => import('@/views/wengan/wengan_edit'),
      name: 'Wengan_edit',
      meta: { title: '无线温度传感器修改', icon: 'theme' },
      hidden: true
    },
    {
      path: 'wengan_setting',
      component: () => import('@/views/wengan/wengan_setting'),
      name: 'Wengan_setting',
      meta: { title: '无线温度传感器远程升级', icon: 'theme' },
      hidden: true
    },
    {
      path: 'wenshi_edit',
      component: () => import('@/views/wenshi/wenshi_edit'),
      name: 'Wenshi_edit',
      meta: { title: '温湿度传感器修改', icon: 'theme' },
      hidden: true
    },
    {
      path: 'wenshi_setting',
      component: () => import('@/views/wenshi/wenshi_setting'),
      name: 'Wenshi_setting',
      meta: { title: '温湿度传感器远程升级', icon: 'theme' },
      hidden: true
    },
    {
      path: 'shengsuo_edit',
      component: () => import('@/views/shengsuo/shengsuo_edit'),
      name: 'Shengsuo_edit',
      meta: { title: '无线伸缩节传感器修改', icon: 'theme' },
      hidden: true
    },
    {
      path: 'shengsuo_setting',
      component: () => import('@/views/shengsuo/shengsuo_setting'),
      name: 'Shengsuo_setting',
      meta: { title: '无线伸缩节传感器远程升级', icon: 'theme' },
      hidden: true
    },
    {
      path: 'bianxing_edit',
      component: () => import('@/views/bianxing/bianxing_edit'),
      name: 'Bianxing_edit',
      meta: { title: '无线变形传感器修改', icon: 'theme' },
      hidden: true
    },
    {
      path: 'bianxing_setting',
      component: () => import('@/views/bianxing/bianxing_setting'),
      name: 'Bianxing_setting',
      meta: { title: '无线变形传感器远程升级', icon: 'theme' },
      hidden: true
    }
  ]
};
