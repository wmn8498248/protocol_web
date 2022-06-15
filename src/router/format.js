// import Layout from '@/views/dashboard/indexHome';
// import IndexHomeLeft from '@/views/dashboard/indexHome';
import Layout from '@/layout/index.vue';
// 开发环境不使用懒加载, 因为懒加载页面太多的话会造成webpack热更新太慢, 所以只有生产环境使用懒加载
const _import = require('./import-' + process.env.NODE_ENV);

//格式化路由菜单
export const formatRouter = res => {
  // let data = res.concat(); //深克隆这个数组对象
  recursion(res); //传入递归
  return res;
};

//递归遍历替换component
function recursion(data) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].children && data[i].children.length > 0) {
      recursion(data[i].children);
    }
    const { component } = data[i];
    if (component !== null || component !== '')
      data[i].component = component == 'Layout' ? Layout : _import(component);
  }
}
