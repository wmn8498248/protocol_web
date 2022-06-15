import axios from '@/utils/ajaxRequest';

// 倾斜传感器列表
export const tiltDetectionList = data =>
  axios.request({
    url: 'tiltDetection/list',
    method: 'post',
    data
  });
// 倾斜传感器详情
export const tiltDetectionInfo = data =>
  axios.request({
    url: 'tiltDetection/info',
    method: 'get',
    params: {
      ...data
    }
  });
// 倾斜传感器新增
export const tiltDetectionSave = data =>
  axios.request({
    url: 'tiltDetection/save',
    method: 'post',
    data
  });
// 倾斜传感器修改
export const tiltDetectionUpdate = data =>
  axios.request({
    url: 'tiltDetection/update',
    method: 'post',
    data
  });
// 倾斜传感器删除
export const tiltDetectionDelete = data =>
  axios.request({
    url: 'tiltDetection/delete',
    method: 'post',
    data
  });
// 倾斜传感器数据下发
export const tiltDetectionSendOut = data =>
  axios.request({
    url: 'tiltDetection/sendOut',
    method: 'post',
    data
  });

// 倾斜传感器历史数据列表
export const tiltDetectionHistoryList = data =>
  axios.request({
    url: 'tiltDetectionHistory/historyList',
    method: 'post',
    data
  });
// 倾斜传感器最新数据列表
export const tiltDetectionNewList = data =>
  axios.request({
    url: 'tiltDetectionHistory/list',
    method: 'post',
    data
  });
// 倾斜传感器最新数据详情
export const tiltDetectionDataInfo = data =>
  axios.request({
    url: 'tiltDetectionHistory/info',
    method: 'get',
    params: {
      ...data
    }
  });
// 倾斜传感器报警列表
export const tiltDetectionAlarmList = data =>
  axios.request({
    url: 'tiltDetectionAlarm/list',
    method: 'post',
    data
  });
// 倾斜传感器清除预警记录
export const tiltDetectionAlarmEliminate = data =>
  axios.request({
    url: 'tiltDetectionAlarm/eliminate',
    method: 'post',
    data
  });
// 倾斜传感器历史报警列表
export const tiltDetectionAlarmHistory = data =>
  axios.request({
    url: 'tiltDetectionAlarm/historyList',
    method: 'post',
    data
  });
// 倾斜传感器报警导出
export const tiltDetectionAlarmExcel = data =>
  axios.request({
    url: 'tiltDetectionAlarm/exportExcel',
    method: 'get',
    params: {
      ...data
    }
  });
// 倾斜传感器报警导出
export const tiltDetectionAlarmExcelHistory = data =>
  axios.request({
    url: 'tiltDetectionAlarm/exportExcelHistory',
    method: 'get',
    params: {
      ...data
    }
  });