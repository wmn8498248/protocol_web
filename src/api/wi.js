import axios from "@/utils/ajaxRequest";


export const getWiMix = (data) =>
  axios.request({
    url: "wi/index/list/mix",
    method: "get",
    params: {
      ...data,
    },
  });
export const alarmExport = (data) =>
  axios.request({
    url: "wi/alarm/export",
    method: "post",
    data,
  });

export const deviceVoltLevel = (data) =>
  axios.request({
    url: "wi/index/list/voltLevel",
    method: "get",
    params: {
      ...data,
    },
  });
export const deviceClassify = (data) =>
  axios.request({
    url: "wi/index/list/deviceClassify",
    method: "get",
    params: {
      ...data,
    },
  });
export const deviceStatus = (data) =>
  axios.request({
    url: "wi/index/list/status",
    method: "get",
    params: {
      ...data,
    },
  });

export const alarmDate = (data) =>
  axios.request({
    url: "wi/index/list/date",
    method: "get",
    params: {
      ...data,
    },
  });

export const deviceHistoryList = (data) =>
  axios.request({
    url: "wi/history/chart",
    method: "post",
    data,
  });
export const tcDeviceHistoryList = (data) =>
  axios.request({
    url: "wi/index/list/date",
    method: "get",
    params: {
      ...data,
    },
  });


export const homeSf6 = (data) =>
  axios.request({
    url: "wi/index",
    method: "get",
    params: {
      ...data,
    },
  });

