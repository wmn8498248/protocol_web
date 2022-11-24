import axios from "@/utils/ajaxRequest";

// 网关列表
export const companyList = data =>
  axios.request({
    url: 'gateway/list',
    method: 'GET',
    data
  });

// 计数传感器
export const deviceAdd = (data) =>
  axios.request({
    url: "count/device/add",
    method: "post",
    data,
  });
export const deviceInfo = (data) =>
  axios.request({
    url: "count/device/info",
    method: "get",
    params: {
      ...data,
    },
  });
export const deviceUpdate = (data) =>
  axios.request({
    url: "count/device/update",
    method: "post",
    data,
  });

export const deviceDelete = (data) =>
  axios.request({
    url: "count/device/delete",
    method: "post",
    params: {
      ...data,
    },
  });

export const deviceList = (data) =>
  axios.request({
    url: "count/device/list",
    method: "post",
    data,
  });

export const indexData = (data) =>
  axios.request({
    url: "count/index",
    method: "get",
    params: {
      ...data,
    },
  });

export const indexChart = (data) =>
  axios.request({
    url: "count/history/chart",
    method: "post",
    data,
  });
