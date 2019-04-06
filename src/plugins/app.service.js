const { ipcMain, shell, dialog } = require('electron');
const fs = require('fs');

ipcMain.on('open_url', (event, args) => {
    shell.openExternal(args);
});

ipcMain.on('write-json', (event, args) => {
    const data = JSON.stringify(args);
    const filePath = dialog.showSaveDialog({
        filters: [{ name: 'Json Files', extensions: ['json'] }],
    });

    if (filePath) {
        try {
            fs.writeFile(filePath, data, err => {
                if (err) event.sender.send('write-json-result', 'File Write Error');
                else event.sender.send('write-json-result', null);
            });
        } catch (error) {
            event.sender.send('write-json-result', 'I/O Error');
        }
    } else {
        event.sender.send('write-json-result', 'cancel');
    }
});

ipcMain.on('read-json', event => {
    const paths = dialog.showOpenDialog({
        filters: [{ name: 'Json Files', extensions: ['json'] }],
    });

    if (paths.length) {
        try {
            fs.readFile(paths[0], 'utf8', (err, data) => {
                if (err) event.sender.send('read-json-result', 'File Read Error');
                else {
                    const json = JSON.parse(data);
                    event.sender.send('read-json-result', json);
                }
            });
        } catch {
            event.sender.send('read-json-result', 'I/O Error');
        }
    } else {
        event.sender.send('read-json-result', 'cancel');
    }
});

ipcMain.on('test-replicate', (event, args) => {
    const stream = fs.createWriteStream('D:/testSync.json');
    args.itemsDb
        .dump(stream, {
            // live: true,
            // retry: true,
        })
        .then(res => {
            console.log('finished sync write');
            console.log(res);
        });
});
