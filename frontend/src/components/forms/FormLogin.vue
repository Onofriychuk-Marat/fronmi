<template>
  <form @submit.prevent="send" class="form">
    <div class="form__title">Вход</div>
    <div class="form__input-wrap">
      <input
        type="text"
        class="input"
        v-model="form.login"
        placeholder="Логин"
      />
    </div>
    <div class="form__input-wrap">
      <input
        type="password"
        class="input"
        v-model="form.password"
        placeholder="Пароль"
      />
    </div>
    <div class="form__button-wrap">
      <base-button title="Вход" :is-loading="isLoading" type="submit" />
    </div>
  </form>
</template>

<script lang="ts">
import { IUserEntrance } from "@/types/user";
import { defineComponent } from "vue";
import BaseButton from "../buttons/BaseButton.vue";

export default defineComponent({
  components: {
    BaseButton,
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  emits: {
    send: (_user: IUserEntrance) => true,
  },
  data() {
    return {
      form: {
        login: "",
        password: "",
      },
    };
  },
  methods: {
    send() {
      this.$emit("send", this.form);
    },
  },
});
</script>

<style scoped lang="scss"></style>
