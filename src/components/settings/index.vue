<template>
    <v-container :fluid="$vuetify.breakpoint.mdAndDown" grid-list-lg>
        <v-layout row wrap>
            <v-flex xs12>
                <v-btn depressed class="ml-0 px-0" @click="$router.go(-1)">
                    <v-icon left small>fas fa-arrow-left</v-icon>
                    <span>Back</span>
                </v-btn>
                <h3 class="d-inline-block ml-3">Tagmania Settings</h3>
            </v-flex>

            <v-flex xs12>
                <v-list two-line>
                    <v-list-tile class="elevation-1">
                        <v-list-tile-content>
                            <v-list-tile-title>Export Data</v-list-tile-title>
                            <v-list-tile-sub-title>Write all tags and items to a json file to be imported later</v-list-tile-sub-title>
                        </v-list-tile-content>
                        <v-list-tile-content class="align-end">
                            <v-btn color="primary" :loading="ui.loading" @click="exportData">
                                <v-icon small left>fas fa-arrow-up</v-icon>
                                <span>Export</span>
                            </v-btn>
                        </v-list-tile-content>
                    </v-list-tile>

                    <v-list-tile class="elevation-1 my-2">
                        <v-list-tile-content>
                            <v-list-tile-title>Import Data</v-list-tile-title>
                            <v-list-tile-sub-title>Read all tags and items from a json file and save them to the local database</v-list-tile-sub-title>
                        </v-list-tile-content>
                        <v-list-tile-content class="align-end">
                            <v-btn color="primary" :loading="ui.loading" @click="importData">
                                <v-icon small left>fas fa-arrow-down</v-icon>
                                <span>Import</span>
                            </v-btn>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-flex>
        </v-layout>
    </v-container>
</template>


<script>
import alert from '../../plugins/alert.service';

export default {
    data: () => ({
        ui: {
            loading: false,
        },
    }),

    methods: {
        exportData() {
            this.ui.loading = true;
            this.$store
                .dispatch('export')
                .then(() => {
                    alert.success('Data Exported Successfully!');
                })
                .catch(err => {
                    if (err !== 'cancel') alert.error(`Exporting Data Failed!<br>${err}`);
                })
                .finally(() => {
                    this.ui.loading = false;
                });
        },
        importData() {
            this.ui.loading = true;
            this.$store
                .dispatch('import')
                .then(() => {
                    alert.success('Data Imported Successfully!');
                })
                .catch(err => {
                    if (err !== 'cancel') alert.error(`Importing Data Failed!<br>${err}`);
                })
                .finally(() => {
                    this.ui.loading = false;
                });
        },
    },
};
</script>
