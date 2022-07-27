import { IChannelResponse } from "@/types/channel";
import { ref, Ref } from "vue";
import axios from "@/plugins/axios";

export default function (channels: Ref<IChannelResponse[]>) {
  const isLoadingChannels = ref({});

  const connectChannel = async (id: number) => {
    isLoadingChannels[id] = true;
    try {
      (await axios.post(`/channels/${id}`)).data;
      const channel = channels.value.find((c) => c.id == id);
      if (channel) channel.isConnected = true;
    } catch {
      alert("Ошибка!");
    }
    isLoadingChannels[id] = true;
  };
  return { connectChannel, isLoadingChannels };
}
