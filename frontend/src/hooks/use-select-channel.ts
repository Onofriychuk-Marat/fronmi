import { IChannelResponse } from "@/types/channel";
import { IScenarioResponse } from "@/types/scenario";
import { ref, Ref, watch } from "vue";

interface IResponse {
  init: () => void;
  selectChannel: (id: number) => void;
  isSelectedChannels: Ref<any>;
  selectedChannel: Ref<IChannelResponse>;
}

export default function (channels: Ref<IChannelResponse[]>): IResponse {
  const isSelectedChannels = ref({});

  const update = () => {
    const id = Number((Object.keys(isSelectedChannels.value) || [])[0]);
    if (!id) return;
    const channel = channels.value.find((c) => c.id == id);
    if (!channel) return;
    selectedChannel.value = channel;
  };
  const init = () => {
    if (!channels.value.length) return;
    const channel = channels.value.find((c) => c.isConnected)
    if (channel) {
      isSelectedChannels.value[channel.id] = true;
    } else {
      isSelectedChannels.value[channels.value[0].id] = true;
    }
    update();
  };

  const selectChannel = (id) => {
    isSelectedChannels.value = { [id]: true };
  };

  watch(
    () => channels.value,
    () => {
      const updateChannel = channels.value.find(
        (c) => c.id === selectedChannel.value.id
      );
      if (updateChannel) {
        selectedChannel.value = updateChannel;
      }
    }
  );

  const selectedChannel = ref({
    id: -1,
    name: "",
    keyApi: "",
    isConnected: false,
    icon: "",
    scenarios: [] as IScenarioResponse[],
  }) as Ref<IChannelResponse>;

  watch(() => isSelectedChannels.value, update);

  return { init, selectChannel, isSelectedChannels, selectedChannel };
}
