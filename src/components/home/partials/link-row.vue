<template>
    <v-list-tile @mouseover="active = true" @mouseleave="active = false" @click="openItem" @contextmenu="showContextMenu">
        <v-list-tile-avatar>
            <i v-if="item.type === 0" class="fas fa-globe-americas grey--text"></i>
            <i v-if="item.type === 1" class="fas fa-sticky-note grey--text"></i>
            <i v-if="item.type === 2" class="fas fa-file-alt grey--text"></i>
        </v-list-tile-avatar>

        <v-list-tile-content>
            <v-list-tile-title>
                <span v-if="item.name" v-text="item.name" class="mr-2"></span>

                <v-chip
                    small
                    label
                    class="my-0 ml-0 mr-2"
                    :class="{ 'white--text': active }"
                    :color="active ? getRandomColor() : ''"
                    v-for="tag in item.tags"
                    :key="tag"
                >
                    <v-icon :color="active ? 'white' : 'black'" class="pl-1" left style="font-size: 12px;">fa-tag</v-icon>
                    <span v-text="tag"></span>
                </v-chip>
            </v-list-tile-title>
            <v-list-tile-sub-title v-if="item.type === 0" v-text="item.link"></v-list-tile-sub-title>
            <v-list-tile-sub-title v-else-if="item.type === 1" v-text="item.content"></v-list-tile-sub-title>
        </v-list-tile-content>

        <v-slide-x-reverse-transition>
            <v-list-tile-action v-if="active">
                <v-btn flat icon @click.stop.capture="copy">
                    <v-icon color="grey" small>fas fa-copy</v-icon>
                </v-btn>
            </v-list-tile-action>
        </v-slide-x-reverse-transition>
    </v-list-tile>
</template>

<script>
import colors from 'vuetify/es5/util/colors';
import events from '../../../client/services/events.service';
const { clipboard } = require('electron');
import alert from '../../../plugins/alert.service';

export default {
    props: ['item'],

    data: () => ({
        active: false,
    }),

    methods: {
        showContextMenu(e) {
            this.$emit('contextmenu', {
                e,
                item: this.item,
            });
        },
        getRandomColor() {
            const ignoredColors = ['grey', 'shades'];
            var colorKeys = Object.keys(colors).filter(item => !ignoredColors.includes(item));
            const randomProperty = colors[colorKeys[(colorKeys.length * Math.random()) << 0]];

            return randomProperty.darken2;
        },

        openItem() {
            if (this.item.type === 0) {
                events.openUrl(this.item.link);
            } else {
                this.$router.push({ name: 'view', query: { id: this.item._id } });
            }
        },

        copy() {
            try {
                const text = this.item.type === 0 ? this.item.link : this.item.content;
                clipboard.writeText(text);
                alert.success('Item Copied!');
            } catch {
                alert.error('Failed to Copy Contents!');
            }
        },
    },
};
</script>
