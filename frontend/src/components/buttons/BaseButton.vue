<template>
  <div v-if="isLoading">Загрузка...</div>
  <button
    v-else
    :class="icon ? 'button-image' : 'button'"
    @click="$emit('click')"
  >
    <img v-if="icon" :src="icon" />
    <div v-else>
      {{ title }}
    </div>
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
    title: {
      type: String,
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
  background: #dc8266;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);
  border-radius: 50px;
  border: 0px;
  padding: 5px 10px;
  color: white;
  filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.25));

  &:hover {
    box-shadow: inset 0px 0px 4px rgba(0, 0, 0, 0.15);
  }

  &:active {
    box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.15);
  }
}

.button-image {
  width: 50px;
  height: 50px;
  background: transparent;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);
  border-radius: 100%;
  border: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    box-shadow: none;
    width: 30px;
    height: 30px;
  }

  &:hover {
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.2);
  }
  &:active {
    box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.15);
  }
}
</style>
