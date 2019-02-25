import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import moment from 'moment';
Vue.filter("dataFormat", (data, pattern = "YYYY-MM-DD HH:mm:ss") => {
    return moment(data).format(pattern)
})
import VuePreview from 'vue-preview';
Vue.use(VuePreview);
import VueResource from 'vue-resource';
Vue.use(VueResource);
Vue.http.options.root = "http://www.liulongbin.top:3005/";
Vue.http.options.emulateJSON = true;
import './lib/mui/css/mui.css';
import './lib/mui/css/icons-extra.css';
import 'mint-ui/lib/style.css';
import MintUI from 'mint-ui';
Vue.use(MintUI);
import router from './router.js';
import app from './App.vue';
var vm = new Vue({
    el: "#app",
    render: c => c(app),
    router
})