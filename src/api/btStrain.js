import axios from "@/utils/ajaxRequest";

export const alarmExport = (data) =>
  axios.request({
    url: "tc/alarm/export",
    method: "post",
    data,
  });

export const deviceVoltLevel = (data) =>
  axios.request({
    url: "bt/strain/index/list/voltLevel",
    method: "get",
    params: {
      ...data,
    },
  });
export const deviceClassify = (data) =>
  axios.request({
    url: "bt/strain/index/list/deviceClassify",
    method: "get",
    params: {
      ...data,
    },
  });
export const deviceStatus = (data) =>
  axios.request({
    url: "bt/strain/index/list/status",
    method: "get",
    params: {
      ...data,
    },
  });

export const alarmDate = (data) =>
  axios.request({
    url: "bt/strain/index/list/date",
    method: "get",
    params: {
      ...data,
    },
  });

export const deviceHistoryList = (data) =>
  axios.request({
    url: "bt/strain/history/chart",
    method: "post",
    data,
  });
export const tcDeviceHistoryList = (data) =>
  axios.request({
    url: "bt/strain/index/list/date",
    method: "get",
    params: {
      ...data,
    },
  });


export const homeSf6 = (data) =>
  axios.request({
    url: "bt/strain/index",
    method: "get",
    params: {
      ...data,
    },
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
