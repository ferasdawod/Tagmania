<template>
    <v-container :fluid="$vuetify.breakpoint.mdAndDown" grid-list-lg>
        <v-form v-model="ui.formValid" lazy-validation ref="form">
            <v-layout row wrap>
                <v-flex xs12>
                    <v-btn depressed class="ml-0 px-0" @click="$router.go(-1)">
                        <v-icon left small>fas fa-arrow-left</v-icon>
                        <span>Back</span>
                    </v-btn>
                    <h3 class="d-inline-block ml-3" v-text="!!entry._id ? 'Edit Item' : 'Add New Item'"></h3>
                </v-flex>
                <v-flex xs12>
                    <v-btn-toggle mandatory v-model="entry.type">
                        <v-btn flat class="px-4">
                            <v-icon left>fas fa-globe-americas</v-icon>
                            <span>Link</span>
                        </v-btn>
                        <v-btn flat class="px-4">
                            <v-icon left>fas fa-sticky-note</v-icon>
                            <span>Note</span>
                        </v-btn>
                        <v-btn flat class="px-4">
                            <v-icon left>fas fa-file-alt</v-icon>
                            <span>Document</span>
                        </v-btn>
                        <v-btn flat disabled class="px-4">
                            <v-icon left>fas fa-file</v-icon>
                            <span>File</span>
                        </v-btn>
                    </v-btn-toggle>
                </v-flex>

                <v-flex xs12>
                    <rs-panes style="position: initial;" units="percents" :size="75" split-to="columns" :allow-resize="true">
                        <div slot="firstPane" class="pr-3">
                            <v-layout column wrap>
                                <v-flex>
                                    <v-text-field label="Name (optional)" box clearable hide-details v-model="entry.name" v-on:keyup.enter="saveItem"/>
                                </v-flex>
                                <template v-if="entry.type === 0">
                                    <v-flex>
                                        <v-text-field
                                            label="Link"
                                            :rules="validations.link"
                                            box
                                            hide-details
                                            clearable
                                            v-model="entry.link"
                                            v-on:keyup.enter="saveItem"
                                        />
                                    </v-flex>
                                </template>
                                <template v-else-if="entry.type === 1">
                                    <v-flex>
                                        <v-textarea label="Content" clearable box hide-details :rules="validations.content" v-model="entry.content"/>
                                    </v-flex>
                                </template>
                                <template v-else-if="entry.type === 2">
                                    <v-flex>
                                        <quill-editor v-model="entry.content" :options="quillOptions"/>
                                    </v-flex>
                                </template>
                                <v-flex>
                                    <v-autocomplete
                                        label="Tags"
                                        box
                                        clearable
                                        multiple
                                        chips
                                        deletable-chips
                                        dense
                                        hide-details
                                        :items="$store.state.tags"
                                        item-text="name"
                                        item-value="name"
                                        :rules="validations.tags"
                                        :search-input.sync="ui.search"
                                        v-model="entry.tags"
                                        ref="tags"
                                        v-on:keyup.enter="saveItem"
                                    ></v-autocomplete>
                                </v-flex>
                                <v-flex>
                                    <v-btn color="info" @click="saveItem" class="ma-0">
                                        <v-icon left small>fas fa-save</v-icon>
                                        <span>Save</span>
                                    </v-btn>
                                </v-flex>
                            </v-layout>
                        </div>

                        <div slot="secondPane" class="pl-3 pb-2">
                            <v-card>
                                <v-text-field label="Add new tag" v-model="ui.newTagName" hide-details box clearable v-on:keyup.enter="addTag"/>
                                <v-list v-if="$store.state.tags.length" class="clamp-height">
                                    <v-list-tile @click="toggleTag(tag)" v-for="tag in $store.state.tags" :key="tag._id">
                                        <v-list-tile-avatar>
                                            <v-avatar v-if="isTagIncluded(tag.name)" color="primary" size="25">
                                                <v-icon color="white" style="font-size: 12px">fa-tag</v-icon>
                                            </v-avatar>
                                            <v-avatar v-else color="grey" size="25"></v-avatar>
                                        </v-list-tile-avatar>
                                        <v-list-tile-content>
                                            <v-list-tile-title v-text="tag.name"></v-list-tile-title>
                                        </v-list-tile-content>
                                    </v-list-tile>
                                </v-list>
                                <v-card-text v-else class="text-xs-center">No items yet!</v-card-text>
                            </v-card>
                        </div>
                    </rs-panes>
                </v-flex>
            </v-layout>
        </v-form>
    </v-container>
</template>

<script>
import alert from '../../plugins/alert.service';

import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

import { quillEditor } from 'vue-quill-editor';

import ResSplitPane from 'vue-resize-split-pane';

export default {
    components: {
        quillEditor,
        'rs-panes': ResSplitPane,
    },
    data: () => ({
        quillOptions: {
            theme: 'snow',
        },
        ui: {
            newTagName: null,
            formValid: true,
        },
        validations: {
            name: [v => !!v || 'Name is required!'],
            link: [v => !!v || 'Link is required!'],
            content: [v => !!v || 'Content is required!'],
            tags: [v => v.length > 0 || 'Tags are required'],
        },
        entry: {
            _id: null,
            type: 0,
            name: null,
            link: null,
            content: null,
            tags: [],
        },
    }),

    methods: {
        fillFromClipboard() {
            if (!navigator.clipboard) return;

            navigator.clipboard
                .readText()
                .then(response => {
                    if (response) this.entry.link = response;
                    this.$refs.tags.focus();
                })
                .catch(e => {
                    alert.error('Failed to grab copied text from the clipboard');
                    console.error(e);
                });
        },

        addTag() {
            if (this.ui.newTagName) {
                this.$store
                    .dispatch('addTag', this.ui.newTagName)
                    .then(() => {
                        this.ui.newTagName = null;
                        alert.info('New Tag Added!');
                    })
                    .catch(error => {
                        alert.error('<b>Failed to add Tag!</b><br>Check if the tag already exists and try again');
                        console.error(error);
                    });
            }
        },

        toggleTag(tag) {
            const index = this.entry.tags.indexOf(tag.name);
            if (index !== -1) {
                this.entry.tags.splice(index, 1);
            } else {
                this.entry.tags.push(tag.name);
            }
        },

        isTagIncluded(tag) {
            return this.entry.tags.includes(tag);
        },

        saveItem() {
            if (this.$refs.form.validate()) {
                this.$store.dispatch('addItem', this.entry).then(() => {
                    this.$router.go(-1);
                    alert.success('Item Saved!');
                });
            } else {
                alert.error('Validation Errors');
            }
        },
    },

    mounted() {
        this.fillFromClipboard();

        if (this.$route.query.id) {
            this.$store.dispatch('getItem', this.$route.query.id).then(response => (this.entry = response));
        }
    },
};
</script>

<style scoped>
.clamp-height {
    overflow: auto;
    max-height: 500px;
}
</style>
