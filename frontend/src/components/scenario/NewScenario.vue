<template>
  <div class="scenario">
    <input class="input scenario__input" v-model="newScenario.name" />
    <base-button title="Добавить" :is-loading="isLoading" @click="create" />
  </div>
</template>

<script lang="ts">
import { IScenarioCreate } from "@/types/scenario";
import { defineComponent, ref, Ref } from "vue";
import BaseButton from "@/components/buttons/BaseButton.vue";

export default defineComponent({
  components: {
    BaseButton,
  },
  props: {
    isLoading: {
      type: Boolean,
      required: false,
    },
  },
  emits: {
    create: (scenario: IScenarioCreate) => true,
  },
  setup(props, context) {
    const newScenario = ref({
      name: "",
    }) as Ref<IScenarioCreate>;

    const create = () => {
      context.emit("create", newScenario.value);
      newScenario.value.name = "";
    };

    return {
      newScenario,
      create,
    };
  },
});
</script>

<style scoped lang="scss"></style>
