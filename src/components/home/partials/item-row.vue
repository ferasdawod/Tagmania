<template>
  <v-list-tile v-bind="rootProps" @click @contextmenu="showContextMenu">
    <v-list-tile-avatar>
      <i v-if="item.type === 0" class="fas fa-globe-americas grey--text"></i>
      <i v-if="item.type === 1" class="fas fa-sticky-note grey--text"></i>
    </v-list-tile-avatar>
    <v-list-tile-content>
      <v-list-tile-title>
        <span v-if="item.name" v-text="item.name" class="mr-2"></span>
        <v-chip
          small
          label=""
          class="my-0 ml-0 mr-2 white--text"
          :color="getRandomColor()"
          v-for="tag in item.tags"
          :key="tag"
        >
          <span v-text="tag"></span>
        </v-chip>
      </v-list-tile-title>
      <v-list-tile-sub-title v-if="item.type === 0" v-text="item.link"></v-list-tile-sub-title>
      <v-list-tile-sub-title v-else-if="item.type === 1" v-text="item.content"></v-list-tile-sub-title>
    </v-list-tile-content>
  </v-list-tile>
</template>

<script>
import colors from "vuetify/es5/util/colors";

export default {
  props: ["item"],

  computed: {
    rootProps() {
      if (this.item.type === 0) {
        return {
          href: this.item.link,
          target: "_blank"
        };
      } else if (this.item.type === 1) {
        return {};
      }
    }
  },

  methods: {
    showContextMenu(e) {
      this.$emit("contextmenu", {
        e,
        item: this.item
      });
    },
    getRandomColor() {
      var colorKeys = Object.keys(colors);
      const randomProperty =
        colors[colorKeys[(colorKeys.length * Math.random()) << 0]];

      return randomProperty.darken2;
    }
  }
};
</script>