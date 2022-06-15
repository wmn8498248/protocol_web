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
    url: 'th/device/sendout/query/general',
    method: 'post',
    data
  });

// 查询报警参数
export const deviceQueryAlarm = data =>
  axios.request({
    url: 'th/device/sendout/query/alarm',
    method: 'post',
    data
  });

// 查询监测数据
export const deviceMonitor = data =>
  axios.request({
    url: 'th/device/sendout/query/monitor',
    method: 'post',
    data
  });

  // 设置通用参数
export const deviceSetGeneral = data =>
  axios.request({
    url: 'th/device/sendout/set/general',
    method: 'post',
    data
  });
  
  // 设置告警参数
export const deviceSetAlarm = data =>
  axios.request({
    url: 'th/device/sendout/set/alarm',
    method: 'post',
    data
  });

  // 设置重启
  export const deviceReset = data =>
  axios.request({
    url: 'th/device/sendout/set/reset',
    method: 'post',
    data
  });





// 温湿度传感器列表
export const temperatureAndHumidityList = data => 
  axios.request({
    url: 'th/device/list',
    method: 'post',
    data
  });
// 温湿度传感器详情
export const temperatureAndHumidityInfo = data =>
  axios.request({
    url: 'th/device/info',
    method: 'get',
    params: {
      ...data
    }
  });
// 温湿度传感器新增
export const temperatureAndHumiditySave = data =>
  axios.request({
    url: 'th/device/save',
    method: 'post',
    data
  });
// 温湿度传感器修改
export const temperatureAndHumidityUpdate = data =>
  axios.request({
    url: 'th/device/update',
    method: 'post',
    data
  });
// 温湿度传感器删除
export const temperatureAndHumidityDelete = data =>
  axios.request({
    url: 'th/device/delete',
    method: 'post',
    data
  });


  // 温湿度传感器历史数据列表
export const thHistoryList = data =>
axios.request({
  url: 'th/history/historyList',
  method: 'post',
  data
});
// 温湿度传感器最新数据列表
export const thHistoryNews = data =>
axios.request({
  url: 'th/history/list',
  method: 'post',
  data
});

// 温湿度传感器最新数据详情
export const thHistoryInfo = data =>
axios.request({
  url: 'th/history/info',
  method: 'post',
  data
});

// 温湿度传感器历史表
export const thHistoryChart = data =>
axios.request({
  url: 'th/history/chart',
  method: 'post',
  data
});
  