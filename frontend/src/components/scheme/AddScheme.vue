<template>
  <div class="block">
    <base-button :icon="require('@/assets/images/add.svg')" @click="add" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BaseButton from "@/components/buttons/BaseButton.vue";
import { IBehaviorCreate, IButtonBehaviorCreate } from "@/types/behavior";

export default defineComponent({
  components: {
    BaseButton,
  },
  setup(_, context) {
    const add = () => {
      const emptyBehavior: IBehaviorCreate = {
        number: NaN,
        isInlineButton: false,
        message: "",
        buttons: [] as IButtonBehaviorCreate[],
      };
      context.emit("add", emptyBehavior);
    };
    return {
      add,
    };
  },
});
</script>

<style scoped lang="scss">
.block {
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  padding-left: 15px;
}
</style>
