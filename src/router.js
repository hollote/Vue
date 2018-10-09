import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store/store';

import Home from './views/Home.vue';
import Signup from './components/auth/Signup.vue';
import Signin from './components/auth/Signin.vue';
import Dashboard from './components/dashboard/Dashboard.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/signup',
    name: 'signin',
    component: Signup,
    beforeEnter(to, from, next) {
      if (!store.getters['auth/isAuthenticated']) {
        next();
      } else {
        next('/');
      }
    }
  },
  {
    path: '/signin',
    name: 'signup',
    component: Signin,
    beforeEnter(to, from, next) {
      if (!store.getters['auth/isAuthenticated']) {
        next();
      } else {
        next('/');
      }
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
  },
  {
    path: '/dashboard',
    component: Dashboard,
    beforeEnter(to, from, next) {
      if (store.getters['auth/isAuthenticated']) {
        next();
      } else {
        next('/signin');
      }
    }
  }
];

export default new VueRouter({mode: 'history', base: process.env.BASE_URL, routes});