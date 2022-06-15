import axios from 'axios';
import { Message, MessageBox } from 'element-ui';
import { getToken } from '@/utils/auth';
import store from '@/store';


class AjaxRequest {
  constructor() {
    this.baseURL = process.env.VUE_APP_BASE_API;
    // this.timeout = 5000
    this.withCredentials = true;
  }
  setInterceptor(instance) {
    instance.interceptors.request.use(
      config => {
        // 每次请求前，将token 放到请求头中
        config.headers.token = getToken() || '';
        // config.headers['Content-Type'] = 'application/json';
        // 每次请求的时候，都拿到一个取消请求的方法 , 产生一个令牌
        let Cancel = axios.CancelToken;
        config.cancelToken = new Cancel(c => {
          store.commit('request/PUSH_TOKEN', c);
        });

        return config;
      },
      err => {
        console.log(error); // for debug
        return Promise.reject(err);
      }
    );

    instance.interceptors.response.use(
      response => {
        if (response.data.code == 200) {
          return response.data.result;
        } else {
          Message({
            message: response.data.message || 'error',
            type: 'error',
            duration: 5 * 1000
          });
          if (response.data.code === 403) {
            console.log(403)
            // 权限出错 返回登录页
            MessageBox.confirm('您已注销，可以取消以保留在该页面上，或者再次登录', '确认退出', {
              confirmButtonText: '返回登录页',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              store.dispatch('user/resetToken').then(() => {
                location.reload();
              });
            });
          }
          return Promise.reject(new Error(response.data.message || 'error'));
        }
      },
      error => {
        console.log('err' + error);
        Message({
          message: error.message || 'error',
          type: 'error',
          duration: 5 * 1000
        });
        return Promise.reject(error || 'error');
      }
    );
  }
  request(options) {
    let instance = axios.create();
    let config = {
      ...options,
      baseURL: this.baseURL,
      // timeout: this.timeout,
      withCredentials: this.withCredentials
    };
    this.setInterceptor(instance);
    return instance(config); //返回的是一个promise
  }
}

export default new AjaxRequest();

/**
 * new AjaxRequest().request({
 *  url: ''
 * }).then(data => {})
 *
 */
