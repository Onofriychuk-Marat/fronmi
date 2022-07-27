<template>
  <div class="list">
    <div v-for="(scenario, index) in scenarios" class="list__item" :key="index">
      <item-scenario
        @update="$emit('update', $event)"
        @remove="$emit('remove', $event)"
        @connect="$emit('connect', $event)"
        @open="$emit('open', $event)"
        :scenario="scenario"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ItemScenario from "@/components/scenario/ItemScenario.vue";
import { IScenarioResponse } from "@/types/scenario";

export default defineComponent({
  components: {
    ItemScenario,
  },
  props: {
    scenarios: {
      type: Object as () => IScenarioResponse[],
      required: true,
    },
  }
});
</script>

<style scoped lang="scss">
.list {
  width: 100%;
  &__item {
    & + & {
      padding-top: 15px;
    }
  }
}
</style>
