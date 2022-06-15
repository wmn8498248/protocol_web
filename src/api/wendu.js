import axios from '@/utils/ajaxRequest';

// 温度电流传感器列表
export const temperatureElectricList = data =>
  axios.request({
    url: 'temperatureElectric/list',
    method: 'post',
    data
  });
// 温度电流传感器详情
export const temperatureElectricInfo = data =>
  axios.request({
    url: 'temperatureElectric/info',
    method: 'get',
    params: {
      ...data
    }
  });
// 温度电流传感器新增
export const temperatureElectricSave = data =>
  axios.request({
    url: 'temperatureElectric/save',
    method: 'post',
    data
  });
// 温度电流传感器修改
export const temperatureElectricUpdate = data =>
  axios.request({
    url: 'temperatureElectric/update',
    method: 'post',
    data
  });
// 温度电流传感器删除
export const temperatureElectricDelete = data =>
  axios.request({
    url: 'temperatureElectric/delete',
    method: 'post',
    data
  });
// 温度电流传感器数据下发
export const temperatureElectricSendOut = data =>
  axios.request({
    url: 'temperatureElectric/sendOut',
    method: 'post',
    data
  });
// 温度电流传感器历史数据列表
export const temperatureElectricHistoryList = data =>
  axios.request({
    url: 'temperatureElectricHistory/historyList',
    method: 'post',
    data
  });

// 温度电流传感器最新数据列表
export const temperatureElectricNewList = data =>
  axios.request({
    url: 'temperatureElectricHistory/list',
    method: 'post',
    data
  });

// 温度电流传感器最新数据详情
export const temperatureElectricDataInfo = data =>
  axios.request({
    url: 'temperatureElectricHistory/info',
    method: 'get',
    params: {
      ...data
    }
  });
  
// 温度电流传感器报警列表
export const temperatureElectricAlarmList = data =>
  axios.request({
    url: 'temperatureElectricAlarm/list',
    method: 'post',
    data
  });
// 温度电流传感器清除预警记录
export const temperatureElectricAlarmEliminate = data =>
  axios.request({
    url: 'temperatureElectricAlarm/eliminate',
    method: 'post',
    data
  });
// 温度电流传感器历史报警列表
export const temperatureElectricAlarmHistory = data =>
  axios.request({
    url: 'temperatureElectricAlarm/historyList',
    method: 'post',
    data
  });
// 温度电流传感器报警列表导出
export const temperatureElectricAlarmExcel = data =>
  axios.request({
    url: 'temperatureElectricAlarm/exportExcel',
    method: 'get',
    params: {
      ...data
    }
  });
// 温度电流传感器报警列表导出历史
export const temperatureElectricAlarmExcelHistory = data =>
  axios.request({
    url: 'temperatureElectricAlarm/exportExcelHistory',
    method: 'get',
    params: {
      ...data
    }
  });