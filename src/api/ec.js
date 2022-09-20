import axios from "@/utils/ajaxRequest";

export const getListMix = (data) =>
  axios.request({
    url: "ec/index/list/mix",
    method: "get",
    params: {
      ...data,
    },
  });


export const alarmExport = (data) =>
  axios.request({
    url: "temp/alarm/export",
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
export const alarmDelete = (data) =>
  axios.request({
    url: "ec/alarm/delete",
    method: "POST",
    params: {
      ...data,
    },
  });
  
export const alarmRead = (data) =>
  axios.request({
    url: "ec/alarm/read",
    method: "POST",
    params: {
      ...data,
    },
  });

export const alarmDate = (data) =>
  axios.request({
    url: "ec/alarm/list",
    method: "POST",
    data,
  });


export const deviceHistoryList = (data) =>
  axios.request({
    url: "ec/history/chart",
    method: "post",
    data,
  });
  
export const tcDeviceHistoryList = (data) =>
  axios.request({
    url: "ec/index/list/date",
    method: "get",
    params: {
      ...data,
    },
  });


export const homeSf6 = (data) =>
  axios.request({
    url: "ec/index",
    method: "get",
    params: {
      ...data,
    },
  });

