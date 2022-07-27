<template>
  <div class="scenario">
    <div class="line scenario__content">
      <base-icon-button
        :icon="require('@/assets/images/remove.svg')"
        :is-loading="isDeleting"
        @click="$emit('remove', scenario)"
      />
      <div v-if="isEditing" class="line">
        <base-icon-button
          v-if="isEditing"
          :icon="require('@/assets/images/close.svg')"
          @click="checkScenario(newNameScenario)"
          :is-animation="false"
        />
        <input
          class="input scenario__input"
          v-if="isEditing"
          v-model="newNameScenario"
        />
      </div>
      <div v-else class="line">
        <base-icon-button
          :icon="require('@/assets/images/edit.svg')"
          @click="isEditing = !isEditing"
        />
        <div class="scenario__name">{{ scenario.name }}</div>
      </div>
      <input
        v-model="isActive"
        @change="$emit('connect', scenario)"
        type="checkbox"
      />
    </div>
    <base-button title="Открыть" @click="$emit('open', scenario)" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import BaseButton from "@/components/buttons/BaseButton.vue";
import BaseIconButton from "@/components/buttons/BaseIconButton.vue";
import { IScenarioCreate, IScenarioResponse } from "@/types/scenario";

export default defineComponent({
  components: {
    BaseButton,
    BaseIconButton,
  },
  props: {
    scenario: {
      type: Object as () => IScenarioResponse,
      required: true,
    },
    isDeleting: {
      type: Boolean,
      default: false,
    },
    isChanging: {
      type: Boolean,
      default: false,
    },
  },
  emit: {
    update: (oldScenario: IScenarioResponse, newScenario: IScenarioCreate) =>
      true,
    remove: (scenario: IScenarioResponse) => true,
    connect: (scenario: IScenarioResponse) => true,
    open: (scenario: IScenarioResponse) => true,
  },
  setup(props, context) {
    const isEditing = ref(false);
    const newNameScenario = ref("");
    const isActive = ref(props.scenario.isActive);
    watch(
      () => props.scenario.isActive,
      () => {
        isActive.value = props.scenario.isActive;
      }
    );

    const checkScenario = (name: string) => {
      isEditing.value = !isEditing.value;
      if (name && name !== props.scenario.name) {
        const updatedScenario = {
          name,
        };
        context.emit("update", {
          oldScenario: props.scenario,
          newScenario: updatedScenario,
        });
      }
      newNameScenario.value = "";
    };

    return {
      isEditing,
      newNameScenario,
      checkScenario,
      isActive,
    };
  },
});

</script>

<style scoped lang="scss">
.scenario {
  width: 100%;
  display: flex;
  justify-content: space-between;

  &__name {
    width: 100%;
    text-align: left;
    font-family: "Rubik";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 15px;
    margin-left: 10px;
    padding-top: 5px;

    color: #292928;
  }

  &__input {
    height: 10px;
    margin-left: 10px;
  }

  &__content {
    margin-right: 15px;
  }
}
.line {
  width: 100%;
  display: flex;
}
</style>
