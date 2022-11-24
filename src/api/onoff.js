import axios from "@/utils/ajaxRequest";

// 设备参数查询
export const onoffInfo = (data) =>
  axios.request({
    url: "onoff/device/info",
    method: "GET",
    params: {
      ...data,
    },
  });

// 设备参数查询
export const onoffQuery = (data) =>
  axios.request({
    url: "onoff/device/query",
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
export const onoffAdd = (data) =>
  axios.request({
    url: "onoff/device/add",
    method: "post",
    data,
  });

// 设备删除
export const onoffDelete = (data) =>
  axios.request({
    url: "onoff/device/delete",
    method: "post",
    params: {
      ...data,
    },
  });

// 设备更新
export const onofUpdae = (data) =>
  axios.request({
    url: "onoff/device/update",
    method: "post",
    data,
  });

// 设备列表
export const onoffList = (data) =>
  axios.request({
    url: "onoff/device/list",
    method: "post",
    data,
  });
// 设备参数设置
export const onoffSetting = (data) =>
  axios.request({
    url: "onoff/device/setting",
    method: "post",
    data,
  });

// 设备参数设置2
export const onoffSettingNew = (data) =>
  axios.request({
    url: "onoff/device/setting2",
    method: "post",
    data,
  });

// 新增任务
export const jobSave = (data) =>
  axios.request({
    url: "onoff/job/save",
    method: "post",
    data,
  });

// 任务列表
export const jobList = (data) =>
  axios.request({
    url: "onoff/job/list",
    method: "post",
    data,
  });

//删除任务
export const delJob = (id) =>
  axios.request({
    url: "onoff/job/delete/" + id,
    method: "post",
  });

//执行任务
export const jobRun = (id) =>
  axios.request({
    url: "onoff/job/run/" + id,
    method: "post",
  });

// 日志
export const jobLog = (data) =>
  axios.request({
    url: "onoff/job/log",
    method: "post",
    data,
  });

// 获取详情
export const jobInfo = (id) =>
  axios.request({
    url: "onoff/job/info/" + id,
    method: "post",
  });

  // 修改信息
export const jobUpdate = (data) =>
axios.request({
  url: "onoff/job/update",
  method: "post",
  data,
});
