import axios from '@/utils/ajaxRequest';


// 导入sf6
export const sf6BatchSave = data =>
  axios.request({
    url: 'sf6/device/batchSave',
    method: 'post', 
    data
  });

export const tcBatchSave = data =>
  axios.request({
    url: 'tc/device/batchSave',
    method: 'post', 
    data
  });
export const thBatchSave = data =>
  axios.request({
    url: 'th/device/batchSave',
    method: 'post', 
    data
  });

export const wiBatchSave = data =>
  axios.request({
    url: 'wi/device/batchSave',
    method: 'post', 
    data
  });


// 所有公司
export const projectList = data =>
  axios.request({
    url: 'company/all',
    method: 'GET', 
    data
  });
// 站点详情
export const projectInfo = data =>
  axios.request({
    url: 'gateway/info',
    method: 'get',
    params: {
      ...data
    }
  });
// 站点新增
export const projectSave = data =>
  axios.request({
    url: 'gateway/save',
    method: 'post',
    data
  });
// 网关修改
export const projectUpdate = data =>
  axios.request({
    url: 'gateway/update',
    method: 'post',
    data
  });
// 网关删除
export const projectDelete = data =>
  axios.request({
    url: 'gateway/delete',
    method: 'DELETE',
    data
  });

// 网关列表
export const companyList = data =>
  axios.request({
    url: 'gateway/list',
    method: 'GET',
    data
  });
  
// 公司详情
export const companyInfo = data =>
  axios.request({
    url: 'company/info',
    method: 'get',
    params: {
      ...data
    }
  });
// 公司新增
export const companySave = data =>
  axios.request({
    url: 'company/add',
    method: 'post',
    data
  });
// 公司修改
export const companyUpdate = data =>
  axios.request({
    url: 'company/update',
    method: 'PUT',
    data
  });
// 公司删除
export const companyDelete = data =>
  axios.request({
    url: 'company/delete',
    method: 'DELETE',
    data
  });
// 管理员或员工列表
export const userList = data =>
  axios.request({
    url: 'user/all',
    method: 'get',
    data
  });

// 账户新增
export const userSave = data =>
  axios.request({
    url: 'user/add',
    method: 'post',
    data
  });

// 账户修改
export const userUpdate = data =>
  axios.request({
    url: 'user/update',
    method: 'PUT',
    data
  });
// 账户详情
export const userInfo = data =>
  axios.request({
    url: 'user/info',
    method: 'get',
    params: {
      ...data
    }
  });
// 账户删除
export const userDelete = data =>
  axios.request({
    url: 'user/delete',
    method: 'DELETE',
    data
  });

export const userRightsAll = data =>
  axios.request({
    url: 'userRights/all',
    method: 'get',
    params: {
      ...data
    }
  });

// 获取全部公司站点菜单
export const userRights = data =>
  axios.request({
    url: 'userRights/info',
    method: 'get',
    params: {
      ...data
    }
  });
