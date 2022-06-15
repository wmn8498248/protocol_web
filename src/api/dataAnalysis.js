import axios from '@/utils/ajaxRequest';

// 数据分析
export const analysis = data =>
  axios.request({
    url: 'analysis/list',
    method: 'post',
    data
  });
// 获取传感器列表信息
export const sensorSearch = data =>
  axios.request({
    url: 'sensorSearch/list',
    method: 'post',
    data
  });
  
// 避雷器
export const blq = data =>
  axios.request({
    url: 'blqHistory/dataList',
    method: 'post',
    data
  });
// 华为loT-无线温度
export const wlwirelesstemperature = data =>
  axios.request({
    url: 'wlwirelesstemperaturehistory/dataList',
    method: 'post',
    data
  });
// 华为loT-无线伸缩节
export const ygwltelescopicjoint = data =>
  axios.request({
    url: 'ygwltelescopicjointhistory/dataList',
    method: 'post',
    data
  });
// 华为loT-无线温湿度
export const temperatureandhumidity = data =>
  axios.request({
    url: 'temperatureandhumidityhistory/dataList',
    method: 'post',
    data
  });
// 华为loT-变形
export const deformation = data =>
  axios.request({
    url: 'deformationhistory/dataList',
    method: 'post',
    data
  });
// 电信天翼-倾斜
export const tiltDetection = data =>
  axios.request({
    url: 'tiltDetectionHistory/dataList',
    method: 'post',
    data
  });
// 电信天翼-温度电流
export const temperatureElectric = data =>
  axios.request({
    url: 'temperatureElectricHistory/dataList',
    method: 'post',
    data
  });
// Lora-2气压
export const pressure = data =>
  axios.request({
    url: 'pressureHistory/dataList',
    method: 'post',
    data
  });
// Lora-2水浸
export const flooding = data =>
  axios.request({
    url: 'floodingHistory/dataList',
    method: 'post',
    data
  });
// Lora-2水位
export const waterLevel = data =>
  axios.request({
    url: 'waterLevelHistory/dataList',
    method: 'post',
    data
  });
// Lora-2温控
export const temperatureControl = data =>
  axios.request({
    url: 'temperatureControlHistory/dataList',
    method: 'post',
    data
  });
// Lora-2计数
export const counting = data =>
  axios.request({
    url: 'countingHistory/dataList',
    method: 'post',
    data
  });