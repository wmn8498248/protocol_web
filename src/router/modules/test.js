// import Layout from '@/views/dashboard/indexHome';
import Layout from '@/layout/index.vue';
export default {
  path: '/theme',
  component: Layout,
  children: [
    {
      path: 'index',
      component: () => import('@/views/theme/index'),
      name: 'Theme',
      meta: { title: 'Theme', icon: 'theme' }
    }
  ]
};
