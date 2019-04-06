export default {
    setDb(state, payload) {
        state.db.tags = payload.tagsDb;
        state.db.items = payload.itemsDb;
        state.db.ready = true;
    },

    setReady(state, isReady) {
        state.appReady = isReady;
    },

    setTags(state, payload) {
        state.tags = payload;
    },

    addTag(state, payload) {
        state.tags.push(payload);
    },
};
