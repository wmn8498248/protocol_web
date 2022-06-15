import axios from '@/utils/ajaxRequest';

// 水位传感器列表
export const waterLevelList = data =>
  axios.request({
    url: 'waterLevel/list',
    method: 'post',
    data
  });
// 水位传感器详情
export const waterLevelInfo = data =>
  axios.request({
    url: 'waterLevel/info',
    method: 'get',
    params: {
      ...data
    }
  });
// 水位传感器新增
export const waterLevelSave = data =>
  axios.request({
    url: 'waterLevel/save',
    method: 'post',
    data
  });
// 水位传感器修改
export const waterLevelUpdate = data =>
  axios.request({
    url: 'waterLevel/update',
    method: 'post',
    data
  });
// 水位传感器删除
export const waterLevelDelete = data =>
  axios.request({
    url: 'waterLevel/delete',
    method: 'post',
    data
  });
// 水位传感器数据下发
export const waterLevelSendOut = data =>
  axios.request({
    url: 'waterLevel/sendOut',
    method: 'post',
    data
  });
// 水位传感器报警列表
export const waterLevelAlarmList = data =>
  axios.request({
    url: 'waterLevelAlarm/list',
    method: 'post',
    data
  });
// 水位传感器清除预警记录
export const waterLevelAlarmEliminate = data =>
  axios.request({
    url: 'waterLevelAlarm/eliminate',
    method: 'post',
    data
  });
// 水位传感器历史报警列表
export const waterLevelAlarmHistory = data =>
  axios.request({
    url: 'waterLevelAlarm/historyList',
    method: 'post',
    data
  });