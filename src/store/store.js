import Vue from 'vue';
import Vuex from 'vuex';

import lang from './modules/lang';
import auth from './modules/auth';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    lang,
    auth
  }
});

export default store
