export default () => store => {
    store.state.db.tags.allDocs({ include_docs: true }).then(response => {
        store.commit('setTags', response.rows.map(tag => tag.doc));
    });
};
