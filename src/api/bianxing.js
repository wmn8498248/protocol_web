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
// 无线变形传感器列表
export const deformationList = data =>
  axios.request({
    url: 'bt/strain/device/list',
    method: 'post',
    data
  });
// 无线变形传感器详情
export const deformationInfo = data =>
  axios.request({
    url: 'bt/strain/device/info',
    method: 'get',
    params: {
      ...data
    }
  });
// 无线变形传感器新增
export const deformationSave = data =>
  axios.request({
    url: 'bt/strain/device/save',
    method: 'post',
    data
  });
// 无线变形传感器修改
export const deformationUpdate = data =>
  axios.request({
    url: 'bt/strain/device/update',
    method: 'post',
    data
  });
// 无线变形传感器删除
export const deformationDelete = data =>
  axios.request({
    url: 'bt/strain/device/delete',
    method: 'post',
    data
  });

  
// 无线变形传感器历史数据列表
export const deformationHistoryList = data =>
  axios.request({
    url: 'bt/strain/history/chart',
    method: 'post',
    data
  });
// 无线变形传感器最新数据列表
export const deformationNewList = data =>
  axios.request({
    url: 'bt/strain/history/list',
    method: 'post',
    data
  });
// 无线变形传感器最新数据详情
export const deformationDataInfo = data =>
  axios.request({
    url: 'bt/strain/history/info',
    method: 'post',
    data
  });