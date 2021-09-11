import Vue from 'vue'
import App from './App'
import Axiosw from './request.json'
// import a from './size.js';
const utile = require('./utile.js');
const Qs = require('qs');

import b from './static/css/page.css'
Vue.config.productionTip = false
Vue.prototype.$axiosw = Axiosw;
Vue.prototype.$utile = utile;
Vue.prototype.$qs = Qs;

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
