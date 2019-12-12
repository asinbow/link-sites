import Vue from 'vue';
import App from './App';
import store from '../store';
import router from './router';
import '../utils/intialize';
import {buildConfig} from '../utils';
import { CONFIG_CONFLUENCE } from '../utils/constants';

Vue.prototype.$browser = global.browser;

/* eslint-disable-next-line no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
});

const url = "https://flexport.atlassian.net/wiki/plugins/viewsource/viewpagesrc.action?pageId=584718000#/";
buildConfig(CONFIG_CONFLUENCE, url).then(config => console.log(config));
