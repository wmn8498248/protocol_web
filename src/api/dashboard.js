import axios from "@/utils/ajaxRequest";





// 公司包含设备类型
export const getLitsMix = (data) =>
  axios.request({
    url: "/sf6/index/list/mix",
    method: "get",
    params: {
      ...data,
    },
  });

// 公司包含设备类型
export const getCompanyDevice = (data) =>
  axios.request({
    url: "/company/device",
    method: "get",
    params: {
      ...data,
    },
  });

// 获取公司列表
export const getCompanyAll = (data) =>
  axios.request({
    url: "company/all",
    method: "get",
    params: {
      ...data,
    },
  });


// 获取公司列表
export const getCompanyHasDevice = (data) =>
  axios.request({
    url: "user/companies/hasDevice",
    method: "get",
    params: {
      ...data,
    },
  });
// 获取当前用户的公司
export const getUserCompany = (data) =>
  axios.request({
    url: "user/companies",
    method: "get",
    params: {
      ...data,
    },
  });


//历史记录
export const voltageUpdate = (data) =>
  axios.request({
    url: "voltage/update",
    method: "post",
    data,
  });
//单个设备信息查询
export const voltageInfo = (data) =>
  axios.request({
    url: "voltage/info",
    method: "get",
    params: {
      ...data,
    },
  });
//历史记录
export const historyListDay = (data) =>
  axios.request({
    url: "voltage/history/list/day",
    method: "post",
    data,
  });
export const historyListWeek = (data) =>
  axios.request({
    url: "voltage/history/list/week",
    method: "post",
    data,
  });
export const historyListMonth = (data) =>
  axios.request({
    url: "voltage/history/list/month",
    method: "post",
    data,
  });

//历史记录显示按照设备和路数(多个)
export const historyBranchList = (data) =>
  axios.request({
    url: "voltage/history/branchList",
    method: "post",
    data,
  });

// 设备增加
export const voltageDelete = (data) =>
  axios.request({
    url: "voltage/delete",
    method: "post",
    data,
  });

// 设备增加
export const voltageSave = (data) =>
  axios.request({
    url: "voltage/save",
    method: "post",
    data,
  });

// 历史记录显示按照设备
export const historyDevice = (data) =>
  axios.request({
    url: "voltage/history/device",
    method: "post",
    data,
  });

//设备列表
export const voltageList = (data) =>
  axios.request({
    url: "voltage/list",
    method: "post",
    data,
  });

export const alarmExport = (data) =>
  axios.request({
    url: "sf6/alarm/export",
    method: "post",
    data,
  });

export const deviceVoltLevel = (data) =>
  axios.request({
    url: "sf6/index/list/voltLevel",
    method: "get",
    params: {
      ...data,
    },
  });
export const deviceClassify = (data) =>
  axios.request({
    url: "sf6/index/list/deviceClassify",
    method: "get",
    params: {
      ...data,
    },
  });
export const deviceStatus = (data) =>
  axios.request({
    url: "sf6/index/list/status",
    method: "get",
    params: {
      ...data,
    },
  });

export const alarmDate = (data) =>
  axios.request({
    url: "sf6/index/list/date",
    method: "get",
    params: {
      ...data,
    },
  });

export const deviceHistoryList = (data) =>
  axios.request({
    url: "sf6/history/chart",
    method: "post",
    data,
  });

//日期查询列表
export const sf6IndexListDate = (data) =>
  axios.request({
    url: "sf6/index/list/date",
    method: "get",
    params: {
      ...data,
    },
  });

export const alarmDay = (data) =>
  axios.request({
    url: "sf6/alarm/day",
    method: "post",
    data,
  });
export const alarmWeek = (data) =>
  axios.request({
    url: "sf6/alarm/week",
    method: "post",
    data,
  });
export const alarmMonth = (data) =>
  axios.request({
    url: "sf6/alarm/month",
    method: "post",
    data,
  });

export const homeSf6 = (data) =>
  axios.request({
    url: "sf6/index",
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
