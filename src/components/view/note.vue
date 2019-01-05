<template>
    <v-container :fluid="$vuetify.breakpoint.mdAndDown" grid-list-lg>
        <v-dialog v-model="ui.deleteDialog" max-width="400" lazy>
            <v-card>
                <v-card-title>
                    <i class="fas fa-trash fa-2x error--text"></i>
                    <div class="ml-3">
                        <h3 class="mb-0">Delete This Item?</h3>
                        <span class="text--secondary">You won't be able to access or recover it later</span>
                    </div>
                </v-card-title>
                <v-spacer/>
                <v-card-actions>
                    <v-spacer/>
                    <v-btn color="error" flat @click="onDeleteClick">
                        <span>Delete</span>
                    </v-btn>
                    <v-btn color="grey" flat @click="ui.deleteDialog = false">
                        <span>Cancel</span>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-layout align-center row>
            <div>
                <v-btn depressed class="ma-0 px-0" @click="$router.go(-1)">
                    <v-icon left small>fas fa-arrow-left</v-icon>
                    <span>Back</span>
                </v-btn>
            </div>

            <v-flex/>

            <div>
                <v-btn small depressed class="mx-2 my-0 px-0" color="info" @click="editItem">Edit</v-btn>
            </div>
            <div>
                <v-btn small depressed class="ma-0 px-0" color="error" @click="ui.deleteDialog = true">Delete</v-btn>
            </div>
        </v-layout>

        <v-layout v-if="item !== null" column wrap>
            <v-flex>
                <h1 v-text="item.name"></h1>
                <v-chip small label class="my-0 ml-0 mr-2" v-for="tag in item.tags" :key="tag">
                    <v-icon left style="font-size: 12px;">fa-tag</v-icon>
                    <span v-text="tag"></span>
                </v-chip>
            </v-flex>

            <v-flex v-html="item.content" style="white-space: pre-line;"></v-flex>
        </v-layout>

        <v-layout v-else justify-center align-center>
            <v-progress-circular indeterminate></v-progress-circular>
        </v-layout>
    </v-container>
</template>

<script>
import alert from '../../plugins/alert.service';

export default {
    name: 'item',

    data: () => ({
        ui: {
            deleteDialog: false,
        },

        item: null,
    }),

    methods: {
        editItem() {
            this.$router.push({ name: 'add', query: { id: this.item._id } });
        },

        onDeleteClick() {
            this.$store.dispatch('deleteItem', this.item).then(() => {
                this.$router.push({ name: 'home' });
                alert.success('Item Deleted');
            });
        },
    },

    mounted() {
        this.$store
            .dispatch('getItem', this.$route.query.id)
            .then(response => {
                this.item = response;
            })
            .catch(() => {});
    },
};
</script>

<style scoped>
</style>
