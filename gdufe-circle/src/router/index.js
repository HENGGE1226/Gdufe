import Vue from 'vue';
import Router from 'vue-router';
import cookie from '../cookies';
import axios from '../axios';
import store from '../store/index';
import Login from '../pages/login/Login';
import User from '../pages/user/User';
import Flame from '../pages/flame/Flame';
import Home from '../pages/home/Home';
import Follow from '../pages/home/Follow';
import Post from '../pages/post/Post';
import Friend from '../pages/user/Friend';
import UserPost from '../pages/post/UserPost';

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      meta: {
        keepAlive: true,
        index: 2,
        ifNav: false
      }
    }, {
      path: '/User',
      name: 'User',
      component: User,
      meta: {
        requiresAuth: true,
        keepAlive: true,
        index: 1,
        ifNav: true
      }
    }, {
      path: '/Home',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true,
        keepAlive: true,
        index: 1,
        ifNav: true
      }
    }, {
      path: '/Follow',
      name: 'Follow',
      component: Follow,
      meta: {
        requiresAuth: true,
        keepAlive: true,
        index: 1,
        ifNav: true
      }
    }, {
      path: '/Flame',
      name: 'Flame',
      component: Flame,
      meta: {
        requiresAuth: true,
        keepAlive: true,
        index: 1,
        ifNav: true
      }
    }, {
      path: '/Post',
      name: 'Post',
      component: Post,
      meta: {
        requiresAuth: true,
        keepAlive: true,
        index: 1,
        ifNav: false,
      }      
    }, {
      path: '/Friend',
      name: 'Friend',
      component: Friend,
      meta: {
        requiresAuth: true,
        keepAlive: true,
        index: 1,
        ifNav: false,
      }      
    }, {
      path: '/userPost',
      name: 'UserPost',
      component: UserPost,
      meta: {
        requiresAuth: true,
        keepAlive: true,
        index: 1,
        ifNav: false,
      }      
    }, 
  ]
})


//在切换路由的时候检验用户是否已登陆
router.beforeEach((to, from, next) => {
  console.log('路由拦截')
  //判断要去的路由有没有requiresAuth
  if (to.meta.requiresAuth) {
    const session = cookie.getCookie('SESSION_ID');
    if (session) {
      axios.checkUser(session)
      .then(({ data }) => {
        if(data.code === 200){
          next();
        }else {
          next({
            path: '/'
          });
        }
      })
      next();
    } else {
      next({
        path: '/'
      });
    }
  } else {
    next();
  }
})

export default router;