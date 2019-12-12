import Vue from 'vue';
import App from './App';
import store from '../store';
import router from './router';
import '../utils/intialize';

Vue.prototype.$browser = global.browser;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
});
