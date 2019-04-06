import PouchDB from 'pouchdb';
PouchDB.plugin(require('pouchdb-find'));
var replicationStream = require('pouchdb-replication-stream');

PouchDB.plugin(replicationStream.plugin);
PouchDB.adapter('writableStream', replicationStream.adapters.writableStream);

const { ipcRenderer } = require('electron');

export default () => store => {
    const tagsDb = new PouchDB('tags');
    const itemsDb = new PouchDB('items');

    Promise.all([tagsDb.info(), itemsDb.info()]).then(() => {
        ipcRenderer.send('test-replicate', { itemsDb, tagsDb });
        store.commit('setDb', { tagsDb, itemsDb });

        store.state.db.tags.allDocs({ include_docs: true }).then(response => {
            store.commit('setTags', response.rows.map(tag => tag.doc));

            store.commit('setReady', true);
        });
    });
};
