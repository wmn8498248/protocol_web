import axios from 'axios';
import { getToken } from '@/utils/auth';
import { Message, MessageBox } from 'element-ui';

export const exportExcel = data => {
  return new Promise((resolve, reject) => {

    axios.request({
      baseURL: process.env.VUE_APP_BASE_API,
      url: data.url,
      headers: {
        token: getToken() || ''
      },
      timeout: 30000,
      method: 'get',
      params: data.params || {},
      responseType: 'blob'
    }).then(res => {
      // let timestamp = new Date().getTime();
      // 组装a标签
      let elink = document.createElement("a");
      // 设置下载文件名
      elink.download = data.params.deviceName +".xlsx";
      elink.style.display ="none";
      let blob =new Blob([res.data]);
      elink.href = URL.createObjectURL(blob);
      document.body.appendChild(elink);
      elink.click();
      document.body.removeChild(elink);
      resolve();
    }).catch(err => {
      console.log('err', err)
      Message({
        message: JSON.stringify(err) || 'error',
        type: 'error',
        duration: 5 * 1000
      });
      resolve();
    });
  });
};

export const exportExcelAlarm = data => {
  return new Promise((resolve, reject) => {

    axios.request({
      baseURL: process.env.VUE_APP_BASE_API,
      url: data.url,
      headers: {
        token: getToken() || ''
      },
      timeout: 30000,
      method: 'get',
      params: data.params || {},
      responseType: 'blob'
    }).then(res => {
      // console.log(data, "exls")
      // let timestamp = new Date().getTime();
      // 组装a标签
      let elink = document.createElement("a");
      // 设置下载文件名
      elink.download = "数据详情.xlsx";
      elink.style.display ="none";
      let blob =new Blob([res.data]);
      elink.href = URL.createObjectURL(blob);
      document.body.appendChild(elink);
      elink.click();
      document.body.removeChild(elink);
      resolve();
    }).catch(err => {
      console.log('err', err)
      Message({
        message: JSON.stringify(err) || 'error',
        type: 'error',
        duration: 5 * 1000
      });
      resolve();
    });
  });
};