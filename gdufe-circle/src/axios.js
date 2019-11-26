import axios from 'axios'
import store from './store'
import router from './router'

axios.defaults.withCredentials = true;
//创建axios实例
var instance = axios.create({
  timeout: 5000, //请求超过5秒即超时返回错误
  headers: { 'Content-Type': 'application/json;charset=UTF-8' },
});

//request拦截器
instance.interceptors.request.use(
  config => {
    //判断是否存在token，如果存在的话，则每个http header都加上token
    if (store.state.token) {
      config.headers.Authorization = `token ${store.state.token}`;
    }
    return config;
  }
);

//respone拦截器
instance.interceptors.response.use(
  response => {
    return response;
  },
  error => { 
    return Promise.reject(error.response);
  }
);

export default {
    // 用户鉴权
    checkUser(session) {
      return instance.get('/api/checkUser',session); 
    },
    
    // 获取验证码
    getCodeImg() {
      return instance.get('/api/');
    },

    // 重新获取验证码
    repeatCode(){
      return instance.get('/api/repeatCode');
    },

    // 用户登录
    userLogin(data) {
      return instance.post('/api/login', data); 
    },

    // 获取用户个人信息
    getUserMessage(userid) {
      return instance.post('/api/getMessage', userid);
    },

    // 获取上传图片服务器的Token
    getUploadToken() {
      return instance.get('/api/getToken');
    },

    // 发表动态
    deliverPost(data) {
      return instance.post('/api/deliverPost', data);
    },

    // 获取所有动态列表
    queryAllPost() {
      return instance.get('/api/queryAll');
    },

    // 获取单条动态的详情
    queryPostById(postId) {
      return instance.post('/api/queryPostById', postId);
    },

    // 更改用户资料
    editUserFile(data) {
      return instance.post('/api/editIcon', data);
    },

    // 发表评论
    postComment(data) {
      return instance.post('/api/postComment', data);
    },

    // 获取全部评论
    queryAllComment(postId) {
      return instance.post('/api/queryAllComment', postId);
    }

}