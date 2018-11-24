<template>

  <v-app>

    <v-content>
      <v-scroll-x-transition mode="out-in">
        <router-view/>
      </v-scroll-x-transition>
    </v-content>

  </v-app>

</template>

<script>
export default {
  name: "App",
  data() {
    return {
      //
    };
  }
};
</script>
