import axios from '@/utils/ajaxRequest';


// 查询监测数据
export const setGeneral = data =>
  axios.request({
    url: 'sf6/device/sendout/set/general',
    method: 'post',
    data
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

// 查询通用参数
export const deviceQueryGeneral = data =>
  axios.request({
    url: 'sf6/device/sendout/query/general',
    method: 'post',
    data
  });

// 查询报警参数
export const deviceQueryAlarm = data =>
  axios.request({
    url: 'sf6/device/sendout/query/alarm',
    method: 'post',
    data
  });

// 查询监测数据
export const deviceMonitor = data =>
  axios.request({
    url: 'sf6/device/sendout/query/monitor',
    method: 'post',
    data
  });

  // 设置通用参数
export const deviceSetGeneral = data =>
  axios.request({
    url: 'sf6/device/sendout/set/general',
    method: 'post',
    data
  });
  
  // 设置告警参数
export const deviceSetAlarm = data =>
  axios.request({
    url: 'sf6/device/sendout/set/alarm',
    method: 'post',
    data
  });

  // 设置重启
  export const deviceReset = data =>
  axios.request({
    url: 'sf6/device/sendout/set/reset',
    method: 'post',
    data
  });


// 气压传感器列表
export const pressureList = data =>
  axios.request({
    url: 'sf6/device/list',
    method: 'post',
    data
  });
// 气压传感器详情
export const pressureInfo = data =>
  axios.request({
    url: 'sf6/device/info',
    method: 'get',
    params: {
      ...data
    }
  });
// 气压传感器新增
export const pressureSave = data =>
  axios.request({
    url: 'sf6/device/save',
    method: 'post',
    data
  });
// 气压传感器修改
export const pressureUpdate = data =>
  axios.request({
    url: 'sf6/device/update',
    method: 'post',
    data
  });
// 气压传感器删除
export const pressureDelete = data =>
  axios.request({
    url: 'sf6/device/delete',
    method: 'DELETE',
    data
  });
// 气压传感器数据下发
export const pressureSendOut = data =>
  axios.request({
    url: 'pressure/sendOut',
    method: 'post',
    data
  });
// 气压传感器历史数据列表
export const pressureHistoryList = data =>
  axios.request({
    url: 'sf6/history/chart',
    method: 'post',
    data
  });

// 气压传感器最新数据列表
export const pressureNewList = data =>
  axios.request({
    url: 'sf6/history/list',
    method: 'post',
    data
  });
  
// 气压传感器最新数据详情
export const pressureDataInfo = data =>
  axios.request({
    url: 'sf6/history/info',
    method: 'post',
    data
  });
// 气压传感器报警列表
export const pressureAlarmList = data =>
  axios.request({
    url: 'sf6/history/list',
    method: 'post',
    data
  });
// 气压传感器清除预警记录
export const pressureAlarmEliminate = data =>
  axios.request({
    url: 'sf6/history/eliminate',
    method: 'post',
    data
  });
// 气压传感器历史报警列表
export const pressureAlarmHistory = data =>
  axios.request({
    url: 'sf6/history/historyList',
    method: 'post',
    data
  });
// 气压传感器报警导出
export const pressureAlarmExcel = data =>
  axios.request({
    url: 'sf6/history/exportExcel',
    method: 'get',
    params: {
      ...data
    }
  });
// 气压传感器报警历史导出
export const pressureAlarmExcelHistory = data =>
  axios.request({
    url: 'sf6/history/exportExcelHistory',
    method: 'get',
    params: {
      ...data
    }
  });