// import Layout from '@/views/dashboard/indexHome';
import Layout from '@/layout/index.vue';
export default {
  path: '/waring',
  component: Layout,
  children: [
    {
      path: 'waring',
      component: () => import('@/views/waring/waring'),
      name: 'Waring',
      meta: { title: '传感器报警', icon: 'theme' }
    }
  ]
};
