import axios from "@/utils/ajaxRequest";

export const getListMix = (data) =>
  axios.request({
    url: "temp/index/list/mix",
    method: "get",
    params: {
      ...data,
    },
  });

export const historyExport = (data) =>
  axios.request({
    url: "temp/index/export/historylist",
    method: "post",
    data,
  });

export const alarmExport = (data) =>
  axios.request({
    url: "temp/index/export/alarmlist",
    method: "post",
    data,
  });

export const deviceVoltLevel = (data) =>
  axios.request({
    url: "th/index/list/voltLevel",
    method: "get",
    params: {
      ...data,
    },
  });
export const deviceClassify = (data) =>
  axios.request({
    url: "th/index/list/deviceClassify",
    method: "get",
    params: {
      ...data,
    },
  });
export const deviceStatus = (data) =>
  axios.request({
    url: "th/index/list/status",
    method: "get",
    params: {
      ...data,
    },
  });
export const alarmRead = (data) =>
  axios.request({
    url: "temp/alarm/read",
    method: "POST",
    params: {
      ...data,
    },
  });

 export const alarmDelete = (data) =>
  axios.request({
    url: "temp/alarm/delete",
    method: "POST",
    params: {
      ...data,
    },
  });
// 正常列表
export const tempNormalList = (data) =>
  axios.request({
    url: "temp/index/normalList",
    method: "POST",
    data,
  });

// 报警列表  
export const alarmDate = (data) =>
  axios.request({
    url: "temp/alarm/list",
    method: "POST",
    data,
  });

export const deviceHistoryList = (data) =>
  axios.request({
    url: "temp/history/chart",
    method: "post",
    data,
  });
  
export const tcDeviceHistoryList = (data) =>
  axios.request({
    url: "temp/index/list/date",
    method: "get",
    params: {
      ...data,
    },
  });


export const homeSf6 = (data) =>
  axios.request({
    url: "temp/index",
    method: "get",
    params: {
      ...data,
    },
  });

