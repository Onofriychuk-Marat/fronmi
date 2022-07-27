<template>
  <div class="list">
    <div
      v-for="(channel, index) in filterChannelsByConnection"
      class="list__channel-wrap"
      :key="index"
    >
      <channel
        :is-loading="isConnecting[channel.id]"
        :is-selected="isSelected[channel.id]"
        :channel="channel"
        @connect="$emit('connect', $event)"
        @select="$emit('select', $event)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { IChannelEmptyResponse } from "@/types/channel";
import { defineComponent, ref, watch } from "vue";
import Channel from "@/components/channel/Channel.vue";

export default defineComponent({
  components: {
    Channel,
  },
  props: {
    channels: {
      type: Object as () => IChannelEmptyResponse[],
      required: true,
    },
    isConnecting: {
      type: Object,
      required: true,
    },
    isSelected: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const filterChannelsByConnection = ref([...props.channels]);
    const update = () => {
      filterChannelsByConnection.value.sort((c1, c2) => {
        if (!c1.isConnected && c2.isConnected) return 1;
        return -1;
      });
    };
    update();

    watch(
      () => props.channels,
      () => {
        filterChannelsByConnection.value = [...props.channels];
        update();
      }
    );

    return {
      filterChannelsByConnection,
    };
  },
});
</script>

<style scoped lang="scss">
.list {
  display: flex;

  &__channel-wrap {
    & + & {
      margin-left: 10px;
    }
  }
}
</style>
