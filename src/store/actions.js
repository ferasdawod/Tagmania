const { ipcRenderer } = require('electron');

export default {
    addTag(context, payload) {
        return new Promise((resolve, reject) => {
            const tag = {
                _id: payload,
                name: payload,
            };
            context.state.db.tags
                .put(tag)
                .then(result => {
                    tag._id = result.id;
                    tag._rev = result.rev;
                    context.commit('addTag', tag);
                    resolve();
                })
                .catch(error => {
                    reject(error);
                });
        });
    },

    addItem(context, payload) {
        if (!payload._id) payload._id = (+new Date()).toString();
        return context.state.db.items.put(payload);
    },

    deleteItem(context, payload) {
        return context.state.db.items.remove(payload);
    },

    getLatestItems(context) {
        return context.state.db.items
            .allDocs({
                include_docs: true,
                limit: 25,
                descending: true,
            })
            .then(response => Promise.resolve(response.rows.map(item => item.doc)));
    },

    getAllItems(context) {
        return context.state.db.items
            .allDocs({
                include_docs: true,
                descending: true,
            })
            .then(response => Promise.resolve(response.rows.map(item => item.doc)));
    },

    getItem(context, id) {
        return context.state.db.items.get(id).then(response => Promise.resolve(response));
    },

    async export(context) {
        return new Promise((resolve, reject) => {
            const tags = context.state.tags;
            context.dispatch('getAllItems').then(data => {
                const exportData = {
                    tags,
                    items: data,
                };

                ipcRenderer.on('write-json-result', (event, args) => {
                    if (args === null) resolve();
                    else reject(args);
                });

                ipcRenderer.send('write-json', exportData);
            });
        });
    },

    import(context) {
        return new Promise((resolve, reject) => {
            ipcRenderer.on('read-json-result', (event, result) => {
                if (typeof result === String) reject(result);

                context.state.db.tags
                    .bulkDocs(result.tags)
                    .then(() => {
                        context.state.db.items.bulkDocs(result.items).then(() => {
                            resolve();
                        });
                    })
                    .catch(err => {
                        reject(err);
                    });

                resolve();
            });

            ipcRenderer.send('read-json');
        });
    },
};
