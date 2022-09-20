import axios from '@/utils/ajaxRequest';

// 计数传感器列表
export const countingList = data =>
  axios.request({
    url: 'counting/list',
    method: 'post',
    data
  });
// 计数传感器详情
export const countingInfo = data =>
  axios.request({
    url: 'counting/info',
    method: 'get',
    params: {
      ...data
    }
  });
// 计数传感器新增
export const countingSave = data =>
  axios.request({
    url: 'counting/save',
    method: 'post',
    data
  });
// 计数传感器修改
export const countingUpdate = data =>
  axios.request({
    url: 'counting/update',
    method: 'post',
    data
  });
// 计数传感器删除
export const countingDelete = data =>
  axios.request({
    url: 'counting/delete',
    method: 'post',
    data
  });
// 计数传感器数据下发
export const countingSendOut = data =>
  axios.request({
    url: 'counting/sendOut',
    method: 'post',
    data
  });
// 计数传感器历史数据列表
export const countingHistoryList = data =>
  axios.request({
    url: 'wi/history/historyList',
    method: 'post',
    data
  });
// 计数传感器最新数据列表
export const countingNewList = data =>
  axios.request({
    url: 'wi/history/list123',
    method: 'post',
    data
  });
// 计数传感器最新数据详情
export const countingDataInfo = data =>
  axios.request({
    url: 'wi/history/info',
    method: 'get',
    params: {
      ...data
    }
  });
// 计数传感器波线图
export const countingDataWave = data =>
  axios.request({
    url: 'wi/history/waveForm',
    method: 'get',
    params: {
      ...data
    }
  });
  
// 计数传感器历史数据导出表格
export const countingHistoryExcel = data =>
  axios.request({
    url: 'countingHistory/exportExcel',
    method: 'get',
    params: {
      ...data
    }
  });