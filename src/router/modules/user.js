// import Layout from '@/views/dashboard/indexHome';
import Layout from '@/layout/index.vue';
export default {
  path: '/ningxia',
  component: Layout,
  redirect: 'noRedirect',
  meta: {
    icon: 'theme',
    title: '网电力有限公司'
  },
  children: [
    {
      path: 'yingchuan',
      component: () => import('@/views/yinchuan/yinchuan'),
      redirect: 'noRedirect',
      name: 'yingchuan',
      meta: {
        icon: 'theme',
        title: '银川'
      },
      children: [
        {
          path: 'bilei',
          component: () => import('@/views/bilei/bilei'),
          name: 'Bilei',
          meta: {
            icon: 'theme',
            title: '避雷器监测'
          }
        },
        {
          path: 'bilei_detail',
          component: () => import('@/views/bilei/bilei_detail'),
          name: 'Bilei_detail',
          meta: {
            icon: 'theme',
            title: '电流详情'
          },
          hidden: true
        },
        {
          path: 'qingxie',
          component: () => import('@/views/qingxie/qingxie'),
          name: 'Qingxie',
          meta: {
            icon: 'theme',
            title: '倾斜监测'
          }
        },
        {
          path: 'qingxie_map',
          component: () => import('@/views/qingxie/qingxie_map'),
          name: 'Qingxie_map',
          meta: {
            icon: 'theme',
            title: '倾斜监测地图'
          },
          hidden: true
        },
        {
          path: 'qingxie_data',
          component: () => import('@/views/qingxie/qingxie_data'),
          name: 'Qingxie_data',
          meta: {
            icon: 'theme',
            title: '倾角数据图'
          },
          hidden: true
        },
        {
          path: 'qingxie_detail',
          component: () => import('@/views/qingxie/qingxie_detail'),
          name: 'Qingxie_detail',
          meta: {
            icon: 'theme',
            title: '倾斜监测详情'
          },
          hidden: true
        },
        {
          path: 'wendu',
          component: () => import('@/views/wendu/wendu'),
          name: 'Wendu',
          meta: {
            icon: 'theme',
            title: '温度电流'
          }
        },
        {
          path: 'wendu_data',
          component: () => import('@/views/wendu/wendu_data'),
          name: 'Wendu_data',
          meta: {
            icon: 'theme',
            title: '温度电流监控图'
          },
          hidden: true
        },
        {
          path: 'qiya',
          component: () => import('@/views/qiya/qiya'),
          name: 'Qiya',
          meta: {
            icon: 'theme',
            title: '气压监测'
          }
        },
        {
          path: 'qiya_data',
          component: () => import('@/views/qiya/qiya_data'),
          name: 'Qiya_data',
          meta: {
            icon: 'theme',
            title: '气压监测监控图'
          },
          hidden: true
        },
        {
          path: 'shuijin',
          component: () => import('@/views/shuijin/shuijin'),
          name: 'shuijin',
          meta: {
            icon: 'theme',
            title: '水浸监测'
          }
        },
        {
          path: 'shuijin_data',
          component: () => import('@/views/shuijin/shuijin_data'),
          name: 'Shuijin_data',
          meta: {
            icon: 'theme',
            title: '水浸监测监控图'
          },
          hidden: true
        },
        {
          path: 'shuiwei',
          component: () => import('@/views/shuiwei/shuiwei'),
          name: 'shuiwei',
          meta: {
            icon: 'theme',
            title: '水位监测'
          }
        },
        {
          path: 'shuiwei_data',
          component: () => import('@/views/shuiwei/shuiwei_data'),
          name: 'Shuiwei_data',
          meta: {
            icon: 'theme',
            title: '水位监测监控图'
          },
          hidden: true
        },
        {
          path: 'wenkong',
          component: () => import('@/views/wenkong/wenkong'),
          name: 'wenkong',
          meta: {
            icon: 'theme',
            title: '温控器监测'
          }
        },
        {
          path: 'wenkong_data',
          component: () => import('@/views/wenkong/wenkong_data'),
          name: 'Wenkong_data',
          meta: {
            icon: 'theme',
            title: '温控器监测监控图'
          },
          hidden: true
        },
        {
          path: 'jishu',
          component: () => import('@/views/jishu/jishu'),
          name: 'Jishu',
          meta: {
            icon: 'theme',
            title: '计数器监测'
          }
        },
        {
          path: 'jishu_data',
          component: () => import('@/views/jishu/jishu_data'),
          name: 'Jishu_data',
          meta: {
            icon: 'theme',
            title: '计数器监控图'
          },
          hidden: true
        },
        {
          path: 'wengan',
          component: () => import('@/views/wengan/wengan'),
          name: 'Wengan',
          meta: {
            icon: 'theme',
            title: '无线温度传感器'
          }
        },
        {
          path: 'wengan_data',
          component: () => import('@/views/wengan/wengan_data'),
          name: 'Wengan_data',
          meta: {
            icon: 'theme',
            title: '无线温度传感器监控图'
          },
          hidden: true
        },
        {
          path: 'wenshi',
          component: () => import('@/views/wenshi/wenshi'),
          name: 'Wenshi',
          meta: {
            icon: 'theme',
            title: '温湿度传感器'
          }
        },
        {
          path: 'wenshi_data',
          component: () => import('@/views/wenshi/wenshi_data'),
          name: 'Wenshi_data',
          meta: {
            icon: 'theme',
            title: '温湿度传感器监控图'
          },
          hidden: true
        },
        {
          path: 'shengsuo',
          component: () => import('@/views/shengsuo/shengsuo'),
          name: 'Shengsuo',
          meta: {
            icon: 'theme',
            title: '无线伸缩节传感器'
          }
        },
        {
          path: 'shengsuo_data',
          component: () => import('@/views/shengsuo/shengsuo_data'),
          name: 'Shengsuo_data',
          meta: {
            icon: 'theme',
            title: '无线伸缩节传感器监控图'
          },
          hidden: true
        },
        {
          path: 'bianxing',
          component: () => import('@/views/bianxing/bianxing'),
          name: 'Bianxing',
          meta: {
            icon: 'theme',
            title: '无线变形传感器'
          }
        },
        {
          path: 'bianxing_data',
          component: () => import('@/views/bianxing/bianxing_data'),
          name: 'Bianxing_data',
          meta: {
            icon: 'theme',
            title: '无线变形传感器监控图'
          },
          hidden: true
        }
      ]
    }
  ]
};
