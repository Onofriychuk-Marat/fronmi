<template>
  <div class="container">
    <div class="line">
      <base-button title="Очистить схему" @click="clearScheme" />
      <base-button title="Сохранить" @click="saveScheme" />
    </div>
    <div class="scheme">
      <div
        v-for="(behavior, index) in updatedScenario.behaviors"
        class="scheme__block"
        :key="'scheme-' + index"
      >
        <block-behavior
          :behavior="behavior"
          @change="changeBehavior"
          @remove="removeBehavior"
          :type="type"
        />
      </div>
      <div class="scheme__block">
        <add-scheme @add="addBehavior" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { IScenarioResponse } from "@/types/scenario";
import { defineComponent, ref } from "vue";
import AddScheme from "@/components/scheme/AddScheme.vue";
import BlockBehavior from "@/components/scheme/BlockBehavior.vue";
import { Networks } from "@/types/networks";
import BaseButton from "@/components/buttons/BaseButton.vue";
import _ from "lodash";
import { IBehaviorResponse } from "@/types/behavior";
import axios from "@/plugins/axios";
import getRegulation from "@/utils/regulation-behavior";

export default defineComponent({
  components: {
    AddScheme,
    BlockBehavior,
    BaseButton,
  },
  props: {
    scenario: {
      type: Object as () => IScenarioResponse,
      required: true,
    },
    type: {
      type: String as () => Networks,
      required: true,
    },
  },
  setup(props) {
    const updatedScenario = ref(_.cloneDeep(props.scenario));

    const clearScheme = async () => {
      updatedScenario.value.behaviors = [];
    };
    const saveScheme = async () => {
      const regulation = getRegulation(props.type);

      const ids: number[] = updatedScenario.value.behaviors.reduce(
        (result: number[], behavior: IBehaviorResponse) => {
          const number = Number(behavior.number);
          if (number || number === 0) {
            result.push(number);
          }
          return result;
        },
        []
      );
      if (ids.length < updatedScenario.value.behaviors.length) {
        alert("У каждой карточки должен быть id!");
        return;
      }
      for (const behavior of updatedScenario.value.behaviors) {
        if (behavior.message.length > regulation.maxlen) {
          alert('Максимальное количество символов в сообщении - ' + regulation.maxlen);
          return;
        }

          if (behavior.isInlineButton) {
            if (regulation.inlineButton.maxcount !== undefined &&
            behavior.buttons.length > regulation.inlineButton.maxcount) {
              alert('Максимальное количество inline кнопок - ' + regulation.inlineButton.maxcount);
              return;
            }
          } else {
            if (regulation.button.maxcount !== undefined &&
            behavior.buttons.length > regulation.button.maxcount) {
              alert('Максимальное количество кнопок - ' + regulation.button.maxcount);
              return;
            }
          }
        for (const button of behavior.buttons) {
          if (ids.indexOf(button.nextNumber) === -1) {
            alert("Кнопки должны содержать id только существующей карточки");
            return;
          }
          if (behavior.isInlineButton) {
            if (regulation.inlineButton.maxlen !== undefined &&
            button.text.length > regulation.inlineButton.maxlen) {
              alert('Максимальное количество символов в inline кнопкe - ' + regulation.inlineButton.maxlen);
              return;
            }
            if (!regulation.inlineButton.link.have && button.link) {
              alert('Для данного типа канала нельзя устанавливать ссылки');
              return;
            }
          } else {
            if (regulation.button.maxlen !== undefined &&
            button.text.length > regulation.button.maxlen) {
              alert('Максимальное количество символов в кнопкe - ' + regulation.button.maxlen);
              return;
            }
            if (!regulation.button.link.have && button.link) {
              alert('Для данного типа канала нельзя устанавливать ссылки');
              return;
            }
          }
        }
      }
      const url = `/behavior?scenarioId=${props.scenario.id}`;
      await axios.patch(url, updatedScenario.value.behaviors);
    };
    const changeBehavior = (behavior: IBehaviorResponse) => {
      updatedScenario.value.behaviors = updatedScenario.value.behaviors.map(
        (b) => {
          if (b.id === behavior.id) {
            return behavior;
          } else {
            return b;
          }
        }
      );
    };
    const removeBehavior = (behavior: IBehaviorResponse) => {
      updatedScenario.value.behaviors = updatedScenario.value.behaviors.filter(
        (b) => {
          if (b.id === behavior.id) {
            return false;
          } else {
            return true;
          }
        }
      );
    };
    const addBehavior = () => {
      let maxId = 0;
      let maxNumber = 0;
      updatedScenario.value.behaviors.forEach((b) => {
        if (b.id >= maxId) {
          maxId = b.id + 1;
        }
        if (b.number >= maxNumber) {
          maxNumber = b.number + 1;
        }
      });
      const isStart = Boolean(!updatedScenario.value.behaviors.length);
      updatedScenario.value.behaviors.push({
        id: maxId,
        number: maxNumber,
        isInlineButton: false,
        message: "",
        isStart,
        buttons: [],
      });
    };
    return {
      clearScheme,
      saveScheme,
      changeBehavior,
      removeBehavior,
      updatedScenario,
      addBehavior,
    };
  },
});
</script>

<style scoped lang="scss">
.container {
  margin-top: 40px;
  width: 100%;
  // background: green;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.line {
  width: 30%;
  display: flex;
  justify-content: space-between;
  margin: 10px;
}
.scheme {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  overflow: auto;

  &__block {
    width: 300px;
    margin: 10px;
  }
}
</style>
