import PouchDB from 'pouchdb';
PouchDB.plugin(require('pouchdb-find'));

export default () => store => {
    const tagsDb = new PouchDB('tags');
    const itemsDb = new PouchDB('items');

    store.commit('setDb', { tagsDb, itemsDb });
};
