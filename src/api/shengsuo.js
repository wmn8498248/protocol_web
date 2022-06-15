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
// 无线伸缩节传感器列表
export const telescopicJointList = data =>
  axios.request({
    url: 'bt/offset/device/list',
    method: 'post',
    data
  });
// 无线伸缩节传感器详情
export const telescopicJointInfo = data =>
  axios.request({
    url: 'bt/offset/device/info',
    method: 'get',
    params: {
      ...data
    }
  });
// 无线伸缩节传感器新增
export const telescopicJointSave = data =>
  axios.request({
    url: 'bt/offset/device/save',
    method: 'post',
    data
  });
// 无线伸缩节传感器修改
export const telescopicJointUpdate = data =>
  axios.request({
    url: 'bt/offset/device/update',
    method: 'post',
    data
  });
// 无线伸缩节传感器删除
export const telescopicJointDelete = data =>
  axios.request({
    url: 'bt/offset/device/delete',
    method: 'post',
    data
  });
// 无线伸缩节传感器历史数据列表
export const telescopicJointHistoryList = data =>
  axios.request({
    url: 'bt/offset/history/chart',
    method: 'post',
    data
  });
// 无线伸缩节传感器最新数据列表
export const telescopicJointNewList = data =>
  axios.request({
    url: 'bt/offset/history/list',
    method: 'post',
    data
  });
// 无线伸缩节传感器最新数据详情
export const telescopicJointDataInfo = data =>
  axios.request({
    url: 'bt/offset/history/info',
    method: 'post',
    data
  });