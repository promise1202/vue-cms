import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import moment from 'moment';
Vue.filter("dataFormat", (data, pattern = "YYYY-MM-DD HH:mm:ss") => {
    return moment(data).format(pattern)
})
import Vuex from 'vuex';
Vue.use(Vuex);
var car = JSON.parse(localStorage.getItem("car") || '[]');
var store = new Vuex.Store({
    state: {
        car: car
    },
    mutations: {
        addToCar(state, goodsinfo) {
            var flag = false;
            state.car.some(item => {
                if (item.id == goodsinfo.id) {
                    item.count += parseInt(goodsinfo.count);
                    flag = true;
                    return true;
                }
            })
            if (!flag) {
                state.car.push(goodsinfo);
            }
            localStorage.setItem("car", JSON.stringify(state.car));
        },
        updatedGoodsInfo(state, goodsinfo) {
            state.car.some(item => {
                if (item.id == goodsinfo.id) {
                    item.count = parseInt(goodsinfo.count);
                    return true;
                }
            })
            localStorage.setItem("car", JSON.stringify(state.car));
        },
        removeGood(state, id) {
            state.car.some((item, i) => {
                if (item.id == id) {
                    state.car.splice(i, 1);
                    return true;
                }
            })
            localStorage.setItem("car", JSON.stringify(state.car))
        },
        updateGoodsSelected(state, info) {
            state.car.some(item => {
                if (item.id == info.id) {
                    item.selected = info.selected;
                    return true;
                }
            })
            localStorage.setItem("car", JSON.stringify(state.car));
        }
    },
    getters: {
        getAllCount(state) {
            var c = 0;
            state.car.forEach(item => {
                c += item.count;
            })
            return c;
        },
        getGoodsCount(state) {
            var o = {};
            state.car.forEach(item => {
                o[item.id] = item.count
            })
            return o;
        },
        getGoodsSelected(state) {
            var o = {};
            state.car.forEach(item => {
                o[item.id] = item.selected;
            })
            return o;
        },
        getGoodsAmount(state) {
            var o = {
                count: 0,
                amount: 0
            }
            state.car.forEach(item => {
                if (item.selected) {
                    o.count += item.count;
                    o.amount += item.count * item.price;
                }
            })
            return o;
        }
    }
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
    router,
    store
})