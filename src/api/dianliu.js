import axios from '@/utils/ajaxRequest';

// 设置通用参数
  export const deviceSetGeneral = data =>
  axios.request({
    url: 'ec/device/setting',
    method: 'post',
    data
  });
// 气压传感器详情
export const pressureInfo = data =>
  axios.request({
    url: 'ec/device/query',
    method: 'post',
    params: {
      ...data
    }
  });

// 网关列表
export const companyList = data =>
  axios.request({
    url: 'gateway/list',
    method: 'GET',
    params: {
      ...data
    }
  });
// 温度电流传感器列表
export const temperatureList = data =>
  axios.request({
    url: 'ec/device/list', 
    method: 'post',
    data
  });
// 温度电流传感器详情
export const temperatureInfo = data =>
  axios.request({
    url: 'ec/device/info',
    method: 'get',
    params: {
      ...data
    }
  });
// 温度电流传感器新增
export const temperatureSave = data =>
  axios.request({
    url: 'ec/device/add',
    method: 'post',
    data
  });
  
// 温度电流传感器修改
export const temperatureUpdate = data =>
  axios.request({
    url: 'ec/device/update',
    method: 'post',
    data
  });
// 温度电流传感器删除
export const temperatureDelete = data =>
  axios.request({
    url: 'ec/device/delete',
    method: 'post',
    params: {
      ...data
    }
  });
  
// 温度电流传感器数据下发
export const temperatureSendOut = data =>
  axios.request({
    url: 'temperature/sendOut',
    method: 'post',
    data
  });
// 温度电流传感器历史数据列表
export const temperatureHistoryList = data =>
  axios.request({
    url: 'ec/history/list',
    method: 'post',
    data
  });

// 温度电流传感器最新数据列表
export const temperatureNewList = data =>
  axios.request({
    url: 'ec/history/list',
    method: 'post',
    data
  });

// 温度电流传感器最新数据详情
export const temperatureDataInfo = data =>
  axios.request({
    url: 'ec/history/info',
    method: 'get',
    params: {
      ...data
    }
  });
  
// 温度电流传感器报警列表
export const temperatureAlarmList = data =>
  axios.request({
    url: 'temperatureAlarm/list',
    method: 'post',
    data
  });
// 温度电流传感器清除预警记录
export const temperatureAlarmEliminate = data =>
  axios.request({
    url: 'temperatureAlarm/eliminate',
    method: 'post',
    data
  });
// 温度电流传感器历史报警列表
export const temperatureAlarmHistory = data =>
  axios.request({
    url: 'temperatureAlarm/historyList',
    method: 'post',
    data
  });
// 温度电流传感器报警列表导出
export const temperatureAlarmExcel = data =>
  axios.request({
    url: 'temperatureAlarm/exportExcel',
    method: 'get',
    params: {
      ...data
    }
  });
// 温度电流传感器报警列表导出历史
export const temperatureAlarmExcelHistory = data =>
  axios.request({
    url: 'temperatureAlarm/exportExcelHistory',
    method: 'get',
    params: {
      ...data
    }
  });
  
  // 温湿度传感器最新数据详情
export const thHistoryInfo = data =>
axios.request({
  url: 'ec/history/info',
  method: 'post',
  params: {
    ...data
  }
});

// 温湿度传感器历史表
export const thHistoryChart = data =>
axios.request({
  url: 'ec/history/chart',
  method: 'post',
  data
});