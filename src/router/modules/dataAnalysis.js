// import Layout from '@/views/dashboard/indexHome';
import Layout from '@/layout/index.vue';
export default {
  path: '/dataAnalysis',
  component: Layout,
  children: [
    {
      path: 'dataAnalysis',
      component: () => import('@/views/dataAnalysis/dataAnalysis'),
      name: 'DataAnalysis',
      meta: { title: '数据分析', icon: 'theme' }
    }
  ]
};
