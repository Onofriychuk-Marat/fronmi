<template>
  <div class="block card">
    <div class="block__header">
      <input v-model.number="updatedBehavior.number" class="input block__id" />
      <div v-if="behavior.isStart" class="block__text">Старт</div>
      <base-icon-button
        @click="$emit('remove', behavior)"
        :icon="require('@/assets/images/remove.svg')"
      />
    </div>

    <textarea
      class="input block__input"
      placeholder="сообщение"
      v-model="updatedBehavior.message"
      :maxlength="restrictions.maxlen"
    />
    <div class="block__buttons">
      <div class="block__text">Кнопки:</div>
      <div class="space-between">
        <div class="block__text">Формат отбражения inline</div>
        <input
          v-model="updatedBehavior.isInlineButton"
          type="checkbox"
          id="scales"
          checked
        />
      </div>
    </div>
    <div
      class="button-behavior"
      v-for="(buttonB, index) in updatedBehavior.buttons"
      :key="'button-behavior-' + index"
    >
      <div class="card">
        <input class="button-behavior__input input" v-model="buttonB.text" />
        <div class="button-behavior__next">
          <div class="button-behavior__text">Кнопка приведет к блоку</div>
          <input
            type="number"
            class="block__id input"
            v-model.number="buttonB.nextNumber"
          />
        </div>
        <div v-if="buttonB.link">
          <div class="button-behavior__text">Ссылка:</div>
          <input
            type="text"
            class="block__input input"
            v-model="buttonB.link"
          />
        </div>
        <base-button
          class="button-behavior__button"
          title="Удалить"
          @click="removeButton(buttonB)"
        />
      </div>
    </div>

    <div class="button-behavior card">
      <input class="button-behavior__input input" v-model="textNewButton" />
      <div class="button-behavior__next">
        <div class="button-behavior__text">Ответ приведет к блоку</div>
        <input
          type="number"
          class="block__id input"
          v-model.number="nextNumberNewButton"
        />
      </div>
      <div>
        <div class="button-behavior__text">Ссылка:</div>
        <input
          type="text"
          class="button-behavior__input input"
          v-model="linkNewButton"
        />
      </div>
      <base-button
        class="button-behavior__button"
        title="Добавить"
        @click="addNewButton"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { IBehaviorResponse, IButtonBehaviorResponse } from "@/types/behavior";
import { defineComponent, ref, watch } from "vue";
import _ from "lodash";
import { Networks } from "@/types/networks";
import getRegulation from "@/utils/regulation-behavior";
import BaseButton from "@/components/buttons/BaseButton.vue";
import BaseIconButton from "@/components/buttons/BaseIconButton.vue";

export default defineComponent({
  components: {
    BaseButton,
    BaseIconButton,
  },
  props: {
    behavior: {
      type: Object as () => IBehaviorResponse,
      required: true,
    },
    type: {
      type: String as () => Networks,
      required: true,
    },
  },
  setup(props, context) {
    const updatedBehavior = ref(_.cloneDeep(props.behavior));
    let restrictions = getRegulation(props.type);
    const textNewButton = ref("");
    const nextNumberNewButton = ref("");
    const linkNewButton = ref("");

    const removeButton = (button: IButtonBehaviorResponse) => {
      updatedBehavior.value.buttons = updatedBehavior.value.buttons.filter(
        (b) => {
          if (b.id !== button.id) return true;
          else return false;
        }
      );
    };

    const addNewButton = () => {
      updatedBehavior.value.buttons.push({
        id: -1,
        nextNumber: Number(nextNumberNewButton.value),
        text: textNewButton.value,
        link: linkNewButton.value,
      });

      nextNumberNewButton.value = "";
      textNewButton.value = "";
      linkNewButton.value = "";
    };

    watch(
      () => updatedBehavior.value,
      () => context.emit("change", updatedBehavior.value)
    );
    return {
      updatedBehavior,
      restrictions,
      textNewButton,
      nextNumberNewButton,
      addNewButton,
      removeButton,
      linkNewButton,
    };
  },
  watch: {
    updatedBehavior: {
      deep: true,
      handler() {
        this.$emit("change", this.updatedBehavior);
      },
    },
  },
  methods: {
    isCanShowButton(index: number) {
      let max;
      if (this.updatedBehavior.isInlineButton) {
        max = this.restrictions?.inlineButton?.maxcount || 0;
      } else {
        max = this.restrictions?.button?.maxcount || 0;
      }
      if (index <= max) {
        return true;
      } else {
        return false;
      }
    },
    isCanAddButton() {
      const count = this.updatedBehavior.buttons.length;
      return this.isCanShowButton(count);
    },
    getMaxLenButton() {
      if (this.updatedBehavior.isInlineButton) {
        return this.restrictions.inlineButton.maxlen;
      } else {
        return this.restrictions.button.maxlen;
      }
    },
  },
});
</script>

<style scoped lang="scss">
.space-between {
  display: flex;
  justify-content: space-between;
}
.line {
  width: 100%;
  display: flex;
}
.button-behavior {
  flex-grow: 1;
  margin: 5px;

  &__button {
    margin: 5px;
  }

  &__input {
    width: 80%;
    margin: 5px;
  }

  &__next {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
.block {
  &__buttons {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: start;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 5px;
  }

  &__text {
    font-weight: 400;
    font-size: 15px;
    line-height: 18px;
    margin: 5px;

    color: #292928;
  }
  &__id {
    width: 40px;
    height: 20px;
  }
  &__input {
    margin: 5px;
  }
}
</style>
