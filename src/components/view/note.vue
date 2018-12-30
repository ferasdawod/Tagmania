<template>
    <v-container :fluid="$vuetify.breakpoint.mdAndDown" grid-list-lg>
        <v-layout row>
            <v-flex>
                <v-btn depressed class="ml-0 px-0" @click="$router.go(-1)">
                    <v-icon left small>fas fa-arrow-left</v-icon>
                    <span>Back</span>
                </v-btn>
                <span class="ml-3 title">View Note</span>
            </v-flex>
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

        <v-tooltip left>
            <v-btn slot="activator" fab fixed bottom right color="info" @click="editItem">
                <v-icon>fa-pen</v-icon>
            </v-btn>
            <span>Edit Note</span>
        </v-tooltip>
    </v-container>
</template>

<script>
export default {
    name: 'item',

    data: () => ({
        item: null,
    }),

    methods: {
        editItem() {
            this.$router.push({ name: 'add', query: { id: this.item._id } });
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
