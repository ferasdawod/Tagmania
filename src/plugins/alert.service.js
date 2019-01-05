import iziToast from 'izitoast';
import Vue from 'vue';

iziToast.settings({
    progressBar: false,
    theme: 'dark',
    position: 'bottomCenter',
    pauseOnHover: true,
});

export default {
    info(data) {
        if (typeof data === 'string')
            iziToast.info({
                message: data,
                backgroundColor: Vue.prototype.$vuetify.theme.info,
            });
        else iziToast.info(data);
    },

    success(message) {
        iziToast.success({
            message,
            backgroundColor: Vue.prototype.$vuetify.theme.success,
        });
    },

    error(message) {
        iziToast.error({
            message,
            backgroundColor: Vue.prototype.$vuetify.theme.error,
        });
    },

    warning(message) {
        iziToast.warning({
            message,
            backgroundColor: Vue.prototype.$vuetify.theme.warning,
        });
    },
};
