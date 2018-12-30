const { ipcRenderer } = require('electron');

export default {
    openUrl(url) {
        ipcRenderer.send('open_url', url);
    },
};
