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


// 查询通用参数
export const deviceQueryGeneral = data =>
  axios.request({
    url: 'wi/device/sendout/query/general',
    method: 'post',
    data
  });

// 查询报警参数
export const deviceQueryAlarm = data =>
  axios.request({
    url: 'wi/device/sendout/query/alarm',
    method: 'post',
    data
  });

// 查询监测数据
export const deviceMonitor = data =>
  axios.request({
    url: 'wi/device/sendout/query/monitor',
    method: 'post',
    data
  });

  // 设置通用参数
export const deviceSetGeneral = data =>
  axios.request({
    url: 'wi/device/sendout/set/general',
    method: 'post',
    data
  });
  
  // 设置告警参数
export const deviceSetAlarm = data =>
  axios.request({
    url: 'wi/device/sendout/set/alarm',
    method: 'post',
    data
  });

  // 设置重启
  export const deviceReset = data =>
  axios.request({
    url: 'wi/device/sendout/set/reset',
    method: 'post',
    data
  });


// 水浸传感器列表
export const floodingList = data =>
  axios.request({
    url: 'wi/device/list',
    method: 'post',
    data
  });
// 水浸传感器详情
export const floodingInfo = data =>
  axios.request({
    url: 'wi/device/info',
    method: 'get',
    params: {
      ...data
    }
  });
// 水浸传感器新增
export const floodingSave = data =>
  axios.request({
    url: 'wi/device/save',
    method: 'post',
    data
  });
// 水浸传感器修改
export const floodingUpdate = data =>
  axios.request({
    url: 'wi/device/update',
    method: 'post',
    data
  });
// 水浸传感器删除
export const floodingDelete = data =>
  axios.request({
    url: 'wi/device/delete',
    method: 'post',
    data
  });
// 水浸传感器数据下发
export const floodingSendOut = data =>
  axios.request({
    url: 'flooding/sendOut',
    method: 'post',
    data
  });

// 水浸传感器报警列表
export const floodingAlarmList = data =>
  axios.request({
    url: 'floodingAlarm/list',
    method: 'post',
    data
  });
// 水浸传感器清除预警记录
export const floodingAlarmEliminate = data =>
  axios.request({
    url: 'floodingAlarm/eliminate',
    method: 'post',
    data

  });
// 水浸传感器历史报警列表
export const floodingAlarmHistory = data =>
  axios.request({
    url: 'floodingAlarm/historyList',
    method: 'post',
    data
  });

 
  // 水浸传感器历史数据列表
export const wiHistoryList = data =>
axios.request({
  url: 'wi/history/chart',
  method: 'post',
  data
});
// 水浸传感器最新数据列表
export const wiHistoryNews = data =>
axios.request({
  url: 'wi/history/list',
  method: 'post',
  data
});
// 水浸传感器最新数据详情
export const wiHistoryInfo = data =>
axios.request({
  url: 'wi/history/info',
  method: 'post',
  data
});