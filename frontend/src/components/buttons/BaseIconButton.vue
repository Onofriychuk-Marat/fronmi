<template>
  <button class="button" @click="$emit('click')">
    <img
      v-if="icon"
      :src="isLoading ? require('@/assets/images/loading.svg') : icon"
    />
  </button>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

export default defineComponent({
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: Object as () => Record<string, any>,
    },
  },
  emits: ["click"],
  setup(props) {
    const urlImage = "@/assets/images/exit.svg";
    return {
      urlImage,
    };
  },
});
</script>

<style scoped lang="scss">
.button {
  height: 30px;
  background: transparent;
  border-radius: 50px;
  border: 0px;

  img {
    width: 20px;
    height: 20px;
  }
  &:hover {
    box-shadow: inset 0px 0px 4px rgba(0, 0, 0, 0.15);
  }

  &:active {
    box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.15);
  }
}
</style>
