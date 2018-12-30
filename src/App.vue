<template>
    <v-app>
        <v-content>
            <v-scroll-x-transition mode="out-in">
                <navigation>
                    <router-view/>
                </navigation>
            </v-scroll-x-transition>
        </v-content>
    </v-app>
</template>

<script>
export default {
    name: 'App',
    data() {
        return {
            //
        };
    },
};
</script>
