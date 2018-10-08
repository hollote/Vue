import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
import Vuelidate from 'vuelidate';

import { i18n } from './translations/index';
import './registerServiceWorker';

import './fa_icons';

Vue.use(Vuelidate);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');
