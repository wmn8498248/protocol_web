import axios from '@/utils/ajaxRequest';

// 避雷器列表
export const blqList = data =>
  axios.request({
    url: 'blq/list',
    method: 'post',
    data
  });
// 避雷器详情
export const blqInfo = data =>
  axios.request({
    url: 'blq/info',
    method: 'get',
    params: {
      ...data
    }
  });
// 避雷器新增
export const blqSave = data =>
  axios.request({
    url: 'blq/save',
    method: 'post',
    data
  });
// 避雷器修改
export const blqUpdate = data =>
  axios.request({
    url: 'blq/update',
    method: 'post',
    data
  });
// 避雷器删除
export const blqDelete = data =>
  axios.request({
    url: 'blq/delete',
    method: 'post',
    data
  });
// 避雷器数据下发
export const blqSendOut = data =>
  axios.request({
    url: 'blq/sendOut',
    method: 'post',
    data
  });
// 避雷器历史数据列表
export const blqHistoryList = data =>
  axios.request({
    url: 'blqHistory/historyList',
    method: 'post',
    data
  });
// 避雷器最新数据列表
export const blqNewList = data =>
  axios.request({
    url: 'blqHistory/list',
    method: 'post',
    data
  });
// 避雷器最新数据详情
export const blqDataInfo = data =>
  axios.request({
    url: 'blqHistory/info',
    method: 'get',
    data
  });