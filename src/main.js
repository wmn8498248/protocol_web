import Vue from "vue";

import Cookies from "js-cookie";

import "normalize.css/normalize.css"; // a modern alternative to CSS resets

import Element from "element-ui";
import "./styles/element-variables.scss";
import i18n from "@/i18n/i18n";
// import enLang from 'element-ui/lib/locale/lang/en'; // 如果使用中文语言包请默认支持，无需额外引入，请删除该依赖
import JsonExcel from "vue-json-excel";
import "@/styles/index.scss"; // global css

import App from "./App";
import store from "./store";
import router from "./router";
import "@/router/hook"; //路由的全部钩子

import "./icons"; // icon

import * as filters from "./filters"; // global filters

import * as echarts from "echarts";
Vue.prototype.$echarts = echarts;
Vue.use(Element, {
  size: Cookies.get("size") || "mini", // set element-ui default size
  // locale: enLang // 如果使用中文，无需设置，请删除
});
Vue.component("downloadExcel", JsonExcel);
// register global utility filters
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  i18n,
  store,
  render: (h) => h(App),
});

//更多设置可自定义添加
