import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        { path: '/', name: 'home', component: () => import('./components/home') },
        { path: '/add', name: 'add', component: () => import('./components/add') },
        { path: '/view', name: 'view', component: () => import('./components/view/note'), props: true },
    ],
});
