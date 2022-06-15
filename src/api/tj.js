import axios from "@/utils/ajaxRequest";

export const alarmExport = (data) =>
  axios.request({
    url: "tj/alarm/export",
    method: "post",
    data,
  });

export const deviceVoltLevel = (data) =>
  axios.request({
    url: "tj/device/voltLevel",
    method: "post",
    data,
  });
export const deviceClassify = (data) =>
  axios.request({
    url: "tj/device/deviceClassify",
    method: "post",
    data,
  });
export const deviceStatus = (data) =>
  axios.request({
    url: "tj/device/status",
    method: "post",
    data,
  });

export const alarmDate = (data) =>
  axios.request({
    url: "tj/alarm/date",
    method: "post",
    data,
  });

export const deviceHistoryList = (data) =>
  axios.request({
    url: "tj/device/historyList",
    method: "post",
    data,
  });
export const tcDeviceHistoryList = (data) =>
  axios.request({
    url: "tj/device/historyList",
    method: "post",
    data,
  });


export const homeSf6 = (data) =>
  axios.request({
    url: "tj/home",
    method: "post",
    data,
  });

// 首页数据
export const home = (data) =>
  axios.request({
    url: "index/home",
    method: "post",
    data,
  });
export const home2 = (data) =>
  axios.request({
    url: "index/home2",
    method: "post",
    data,
  });

// 首页数据
export const homeNew = (data) =>
  axios.request({
    url: "index/newHome1",
    method: "post",
    data,
  });

// 导航条报警
export const getAlarmList = (data) =>
  axios.request({
    url: "index/getAlarmList",
    method: "post",
    data,
  });
