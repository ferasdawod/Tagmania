export default {

    setDb(state, payload) {
        state.db.tags = payload.tagsDb;
        state.db.items = payload.itemsDb;
    },

    setTags(state, payload) {
        state.tags = payload;
    },

    addTag(state, payload) {
        state.tags.push(payload);
    }

}