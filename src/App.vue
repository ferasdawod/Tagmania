<template>
    <v-app>
        <v-content v-if="appReady">
            <v-scroll-x-transition mode="out-in">
                <navigation>
                    <router-view/>
                </navigation>
            </v-scroll-x-transition>
        </v-content>

        <v-content v-else>
            <v-container fluid fill-height align-center justify-center>
                <v-progress-circular indeterminate size="50"/>>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
export default {
    name: 'App',
    computed: {
        appReady() {
            return this.$store.state.appReady;
        },
    },
};
</script>
