import Vue from 'vue';

import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Element)

import App from './App';
import '../utils/intialize';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
});
