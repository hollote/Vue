// https://github.com/FortAwesome/vue-fontawesome
import Vue from 'vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faFlag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faFlag);
Vue.component('font-awesome-icon', FontAwesomeIcon);