<template>
  <div class="page">
    <div class="page__header">
      <div class="wrap-button-header">
        <base-button
          :icon="require('@/assets/images/profile.svg')"
          @click="$router.push('/profile')"
        />
      </div>
      <div class="wrap-list-channels">
        <list-channels
          @connect="connectChannel"
          @select="selectChannel"
          :is-connecting="isLoadingChannels"
          :is-selected="isSelectedChannels"
          :channels="emptyChannels"
        />
      </div>
    </div>
    <div class="center-h content" v-if="selectedChannel.isConnected">
      <div v-if="!openedScenario">
        <div class="content__block">
          <setting-channel
            @update="updateChannels"
            :channels="channels"
            :channel="selectedChannel"
          />
        </div>
        <div class="content__block">
          <scenarios
            @update="updateChannels"
            @open="openChannel"
            :channels="channels"
            :channel="selectedChannel"
          />
        </div>
      </div>
      <div v-else class="center-h">
        <div class="toolbar">
          <div class="line">
            <div class="toolbar__back">
              <base-button
                :icon="require('@/assets/images/back.svg')"
                @click="back"
              />
            </div>
            <!-- <base-button title="Очистить схему" @click="clearScheme" /> -->
          </div>
          <!-- <base-button
            title="Сохранить"
            :is-loading="isSaving"
            @click="saveScheme"
          /> -->
        </div>
        <div class="container-scheme-wrap">
          <container-scheme
            :scenario="openedScenario"
            :type="selectedChannel.name"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  Ref,
  ref,
  computed,
  ComputedRef,
  onMounted,
  watch,
} from "vue";
import BaseButton from "@/components/buttons/BaseButton.vue";
import axios from "@/plugins/axios";
import useAxios from "@/hooks/use-axios";
import { IChannelEmptyResponse, IChannelResponse } from "@/types/channel";
import ListChannels from "@/components/channel/ListChannels.vue";
import useConnectChannel from "@/hooks/use-connect-channel";
import useSelectChannel from "@/hooks/use-select-channel";
import SettingChannel from "@/components/channel/SettingChannel.vue";
import Scenarios from "@/components/scenario/Scenarios.vue";
import { IScenarioResponse } from "@/types/scenario";
import ContainerScheme from "@/components/scheme/ContainerScheme.vue";

export default defineComponent({
  components: {
    BaseButton,
    ListChannels,
    SettingChannel,
    Scenarios,
    ContainerScheme,
  },
  setup() {
    const channels = ref([]) as Ref<IChannelResponse[]>;
    const emptyChannels = computed(() => {
      return channels.value.map((c) => {
        return {
          id: c.id,
          name: c.name,
          icon: c.icon,
          isConnected: c.isConnected,
        };
      });
    }) as ComputedRef<IChannelEmptyResponse[]>;

    const [getChannels, isGetingChannels] = useAxios(async () => {
      channels.value = (await axios.get("/channels")).data;
    });

    const { connectChannel, isLoadingChannels } = useConnectChannel(channels);
    const { init, selectChannel, isSelectedChannels, selectedChannel } =
      useSelectChannel(channels);
    onMounted(async () => {
      await getChannels(undefined);
      init();
    });

    const updateChannels = (updateChannels: IChannelResponse[]) => {
      channels.value = updateChannels;
    };

    const openedScenario = ref(undefined) as Ref<undefined | IScenarioResponse>;
    const [saveScheme, isSaving] = useAxios(async () => {
      //
    });
    watch(
      () => selectedChannel.value,
      () => (openedScenario.value = undefined)
    );
    const openChannel = (scenario: IScenarioResponse) =>
      (openedScenario.value = scenario);
    const back = () => (openedScenario.value = undefined);

    return {
      getChannels,
      isGetingChannels,
      channels,
      emptyChannels,
      connectChannel,
      isLoadingChannels,
      isSelectedChannels,
      selectChannel,
      selectedChannel,
      updateChannels,
      saveScheme,
      isSaving,
      openChannel,
      back,
      openedScenario,
    };
  },
  methods: {
    clearScheme() {
      //
    },
  },
});
</script>

<style scoped lang="scss">
.wrap-list-channels {
  width: 100%;
  // padding-right: 50px;
  display: flex;
  justify-content: center;
  position: absolute;
  left: 0;
  right: 0;
  z-index: 1000;
}

.container-scheme-wrap {
  width: 100%;
  // background: red;
}

.content {
  width: 100%;

  &__block {
    margin-top: 40px;
    min-width: 500px;
  }
}

.wrap-button-header {
  z-index: 1001;
}

.toolbar {
  margin-top: 40px;
  width: 500px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__back {
    margin-right: 15px;
  }
}

.line {
  display: flex;
  align-items: center;
}
</style>
