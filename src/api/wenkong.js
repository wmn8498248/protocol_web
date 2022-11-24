import axios from '@/utils/ajaxRequest';
// 网关列表
export const companyList = data =>
  axios.request({
    url: 'gateway/list',
    method: 'GET',
    params: {
      ...data
    }
  });
// 温控传感器列表
export const temperatureControlList = data =>
  axios.request({
    url: 'tc/device/list',
    method: 'post',
    data
  });
// 温控传感器详情
export const temperatureControlInfo = data =>
  axios.request({
    url: 'tc/device/info',
    method: 'get',
    params: {
      ...data
    }
  });
// 温控传感器新增
export const temperatureControlSave = data =>
  axios.request({
    url: 'tc/device/save',
    method: 'post',
    data
  });
// 温控传感器修改
export const temperatureControlUpdate = data =>
  axios.request({
    url: 'tc/device/update',
    method: 'post',
    data
  });
// 温控传感器删除
export const temperatureControlDelete = data =>
  axios.request({
    url: 'tc/device/delete',
    method: 'DELETE',
    data
  });
// 温控传感器数据下发
export const temperatureControlSendOut = data =>
  axios.request({
    url: 'tc/history/sendOut',
    method: 'post',
    data
  });
// 温控传感器历史数据列表
export const temperatureControlHistoryList = data =>
  axios.request({
    url: '/tc/history/chart',
    method: 'post',
    data
  });
// 温控传感器最新数据列表
export const temperatureControlNewList = data =>
  axios.request({
    url: 'tc/history/list',
    method: 'post',
    data
  });
  
// 温控传感器最新数据详情
export const temperatureControlDataInfo = data =>
  axios.request({
    url: 'tc/history/info',
    method: 'post',
    data
  });