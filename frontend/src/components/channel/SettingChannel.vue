<template>
  <div class="setting card card_big">
    <div class="setting__header">
      <div class="card__title">Настройки {{ channel.name }}</div>
      <base-button
        title="Отключиться"
        :is-loading="isDisconnecting"
        @click="disconnect"
      />
    </div>
    <div class="setting__content">
      <div class="card__text setting__text">API key:</div>
      <input class="input setting__input" v-model="apiKey" />
      <base-button
        title="Сохранить"
        :is-loading="isSaving"
        @click="saveChannel"
      />
    </div>
  </div>
</template>

<script lang="ts">
import useAxios from "@/hooks/use-axios";
import { IChannelResponse } from "@/types/channel";
import { defineComponent, ref, watch } from "vue";
import BaseButton from "@/components/buttons/BaseButton.vue";
import axios from "@/plugins/axios";

export default defineComponent({
  components: {
    BaseButton,
  },
  props: {
    channel: {
      type: Object as () => IChannelResponse,
      required: true,
    },
    channels: {
      type: Object as () => IChannelResponse[],
      required: true,
    },
  },
  emits: {
    update: (channels: IChannelResponse[]) => true,
  },
  setup(props, context) {
    const apiKey = ref(props.channel.keyApi);

    watch(
      () => props.channel,
      () => {
        apiKey.value = props.channel.keyApi;
      }
    );

    const emitUpdatedChannels = (channel: IChannelResponse) => {
      const channels = props.channels.map((c) => {
        if (c.id !== channel.id) return c;
        return channel;
      });
      context.emit("update", channels);
    };
    const [disconnect, isDisconnecting] = useAxios(async () => {
      const updatedChannel = (
        await axios.delete(`/channels/${props.channel.id}`)
      ).data;
      emitUpdatedChannels(updatedChannel);
    });
    const [saveChannel, isSaving] = useAxios(async () => {
      const updatedChannel = (
        await axios.patch(`/channels/${props.channel.id}`, {
          keyApi: apiKey.value,
        })
      ).data;
      emitUpdatedChannels(updatedChannel);
    });
    return {
      apiKey,
      disconnect,
      isDisconnecting,
      saveChannel,
      isSaving,
    };
  },
});
</script>

<style scoped lang="scss">
.setting {
  width: 100%;

  &__header {
    display: flex;
    justify-content: space-between;
  }

  &__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
  }

  &__input {
    height: 12px;
    width: 100%;
    margin: 0px 10px;
  }

  &__text {
    min-width: 75px;
    text-align: left;
  }
}
</style>
