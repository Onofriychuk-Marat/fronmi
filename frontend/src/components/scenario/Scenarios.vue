<template>
  <div class="card card_big setting">
    <div class="card__title">Сценарии</div>
    <div class="wrap-scenario">
      <list-scenarios
        @remove="remove"
        @update="update"
        @connect="changeConnecton"
        @open="$emit('open', $event)"
        :scenarios="channel.scenarios"
      />
    </div>
    <div class="wrap-scenario">
      <new-scenarios @create="createScenario" :is-loading="isCreating" />
    </div>
  </div>
</template>

<script lang="ts">
import { IChannelResponse } from "@/types/channel";
import { defineComponent, ref } from "vue";
import useAxios from "@/hooks/use-axios";
import { IScenarioCreate, IScenarioResponse } from "@/types/scenario";
import ListScenarios from "./listScenarios.vue";
import NewScenarios from "@/components/scenario/NewScenario.vue";
import axios from "@/plugins/axios";
import _ from "lodash";

export default defineComponent({
  components: {
    NewScenarios,
    ListScenarios,
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
    const newScenario = ref("");

    const emitChangeScenarios = (
      scenario: IScenarioResponse,
      type: "delete" | "create" | "update"
    ) => {
      const channels = props.channels.map((c) => {
        if (c.id !== props.channel.id) return c;
        const channel = _.cloneDeep(props.channel);
        if (type === "create") {
          channel.scenarios.push(scenario);
          return channel;
        } else {
          channel.scenarios = channel.scenarios.filter(
            (s) => s.id !== scenario.id
          );
          return channel;
        }
      });
      context.emit("update", channels);
    };
    const [createScenario, isCreating] = useAxios(
      async (scenario: IScenarioCreate) => {
        const url = `/scenarios?channelId=${props.channel.id}`;
        const createdScenario = (await axios.post(url, scenario)).data;
        emitChangeScenarios(createdScenario, "create");
      }
    );

    const [remove, isRemoving] = useAxios(
      async (scenario: IScenarioResponse) => {
        const url = `/scenarios/${scenario.id}`;
        const deletedScenario = (await axios.delete(url)).data;
        emitChangeScenarios(deletedScenario, "delete");
      }
    );

    const emitUpdateScenarios = (
      oldScenario: IScenarioResponse,
      newScenario: IScenarioResponse
    ) => {
      const channels = props.channels.map((c) => {
        if (c.id !== props.channel.id) return c;

        const channel = _.cloneDeep(props.channel);
        channel.scenarios = channel.scenarios.map((s) => {
          if (s.id !== oldScenario.id) return s;
          else return newScenario;
        });
        return channel;
      });
      context.emit("update", channels);
    };

    const emitConnectScenarios = (
      oldScenario: IScenarioResponse,
      newScenario: IScenarioResponse
    ) => {
      const channels = props.channels.map((c) => {
        if (c.id !== props.channel.id) return c;

        const channel = _.cloneDeep(props.channel);
        channel.scenarios = channel.scenarios.map((s) => {
          if (s.id !== oldScenario.id) return {...s, isActive: false};
          else return newScenario;
        });
        return channel;
      });
      context.emit("update", channels);
    };

    const [update] = useAxios(
      async (payload: {
        oldScenario: IScenarioResponse;
        newScenario: IScenarioCreate;
      }) => {
        const url = `/scenarios/${payload.oldScenario.id}`;
        const updatedScenario = (await axios.patch(url, payload.newScenario))
          .data;
        emitUpdateScenarios(payload.oldScenario, updatedScenario);
      }
    );

    const [changeConnecton] = useAxios(async (scenario: IScenarioResponse) => {
      let updatedScenario;
      if (scenario.isActive) {
        const url = `/scenarios/${scenario.id}/unactivity`;
        updatedScenario = (await axios.delete(url)).data;
      } else {
        const url = `/scenarios/${scenario.id}/activity`;
        updatedScenario = (await axios.post(url)).data;
      }
      emitConnectScenarios(scenario, updatedScenario);
    });

    return {
      newScenario,
      createScenario,
      isCreating,
      remove,
      isRemoving,
      open,
      update,
      changeConnecton,
    };
  },
});
</script>

<style scoped lang="scss">
.wrap-scenario {
  margin-top: 15px;
  width: 100%;
}
.setting {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  &__scenario {
    //
  }
}
</style>
