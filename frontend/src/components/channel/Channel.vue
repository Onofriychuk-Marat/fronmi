<template>
  <button
    class="channel"
    :class="{ channel_selected: isSelected }"
    @click="$emit('select', channel.id)"
  >
    <img class="channel__image" :src="channel.icon" />
    <div v-if="isLoading">Загрузка...</div>
    <div v-else-if="channel.isConnected" class="channel__connect" />
    <div v-else class="channel__disabled">
      <base-button title="Подключить" @click="$emit('connect', channel.id)" />
    </div>
  </button>
</template>

<script lang="ts">
import { IChannelEmptyResponse } from "@/types/channel";
import { defineComponent } from "vue";
import BaseButton from "@/components/buttons/BaseButton.vue";

export default defineComponent({
  components: {
    BaseButton,
  },
  props: {
    channel: {
      type: Object as () => IChannelEmptyResponse,
      required: true,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    isSelected: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style scoped lang="scss">
.channel {
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(17px);
  /* Note: backdrop-filter has minimal browser support */

  border-radius: 30px;
  padding: 10px;
  display: flex;
  align-items: center;

  &:hover {
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.2);
    // border: 2px solid #fcba7895;
  }

  &_selected {
    border: 2px solid #93aced;
  }

  &__image {
    width: 30px;
    height: 30px;
  }
  &__connect {
    width: 15px;
    height: 15px;
    margin-left: 10px;

    background: #81f159;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);
    border-radius: 50px;
    box-shadow: inset 0px 0px 4px rgba(0, 0, 0, 0.25);
  }

  &__disabled {
    margin-left: 10px;
  }
}
</style>
