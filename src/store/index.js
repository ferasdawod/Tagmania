import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import state from './state';
import actions from './actions';
import mutations from './mutations';

import initDb from './plugins/initDb';

export default new Vuex.Store({
    state,
    mutations,
    actions,

    plugins: [initDb()],
});
