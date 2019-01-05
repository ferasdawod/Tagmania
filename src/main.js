import '@babel/polyfill';
import Vue from 'vue';

import './plugins/vuetify';

import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import './registerTinymce';

import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@fortawesome/fontawesome-free/css/all.css';
import 'izitoast/dist/css/iziToast.min.css';

import Navigation from 'vue-navigation';
Vue.use(Navigation, { router, store });

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
