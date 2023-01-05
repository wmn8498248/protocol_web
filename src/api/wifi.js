import axios from "@/utils/ajaxRequest";



// 设备参数查询
export const getInfo = (data) =>
  axios.request({
    url: "wifi/device/info",
    method: "GET",
    params: {
      ...data,
    },
  });


// 设备参数查询
export const getQuery = (data) =>
  axios.request({
    url: "wifi/device/query",
    method: "GET",
    params: {
      ...data,
    },
  });


// 网关列表
export const companyList = (data) =>
  axios.request({
    url: "gateway/list",
    method: "GET",
    data,
  });
  

// 设备增加
export const deviceAdd = (data) =>
  axios.request({
    url: "wifi/device/add",
    method: "post",
    data,
  });

// 设备删除
export const deviceDelete = (data) =>
  axios.request({
    url: "wifi/device/delete",
    method: "post",
    params: {
      ...data,
    },
  });

// 设备更新
export const deviceUpdate = (data) =>
  axios.request({
    url: "wifi/device/update",
    method: "post",
    data,
  });

// 设备列表
export const deviceList = (data) =>
  axios.request({
    url: "wifi/device/list",
    method: "post",
    data,
  });

// 设备参数设置
export const deviceSetting = (data) =>
  axios.request({
    url: "wifi/device/setting",
    method: "post",
    data,
  });

// 设备重启
export const deviceReset = (data) =>
  axios.request({
    url: "wifi/device/reset",
    method: "post",
    params: {
      ...data,
    },
  });
