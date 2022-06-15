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
// 无线温度传感器列表
export const wirelessTemperatureList = data =>
  axios.request({
    url: 'bt/temperature/device/list',
    method: 'post',
    data
  });
// 无线温度传感器详情
export const wirelessTemperatureInfo = data =>
  axios.request({
    url: 'bt/temperature/device/info',
    method: 'get',
    params: {
      ...data
    }
  });
// 无线温度传感器新增
export const wirelessTemperatureSave = data =>
  axios.request({
    url: 'bt/temperature/device/save',
    method: 'post',
    data
  });
// 无线温度传感器修改
export const wirelessTemperatureUpdate = data =>
  axios.request({
    url: 'bt/temperature/device/update',
    method: 'post',
    data
  });
// 无线温度传感器删除
export const wirelessTemperatureDelete = data =>
  axios.request({
    url: 'bt/temperature/device/delete',
    method: 'post',
    data
  });
  
// 无线温度传感器实时设备列表
export const wirelessTemperatureNewList = data =>
  axios.request({
    url: 'bt/temperature/history/list',
    method: 'post',
    data
  });
// 无线温度传感器实时设备信息详情
export const wirelessTemperatureDataInfo = data =>
  axios.request({
    url: 'bt/temperature/history/info',
    method: 'post',
    data
  });
// 无线温度传感器历史数据
export const wirelessTemperatureHistoryList = data =>
  axios.request({
    url: 'bt/temperature/history/chart',
    method: 'post',
    data
  });