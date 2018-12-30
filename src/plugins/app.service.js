const { ipcMain, shell } = require('electron');

ipcMain.on('open_url', (event, args) => {
    shell.openExternal(args);
});
