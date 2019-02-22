import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import './lib/mui/css/mui.css';
import './lib/mui/css/icons-extra.css';
import 'mint-ui/lib/style.css';
import {
    Header
} from 'mint-ui';
Vue.component(Header.name, Header);
import router from './router.js';
import app from './App.vue';
var vm = new Vue({
    el: "#app",
    render: c => c(app),
    router
})