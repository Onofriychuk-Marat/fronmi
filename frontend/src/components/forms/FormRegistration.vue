<template>
  <form @submit.prevent="send" class="form">
    <div class="form__title">Регистрация</div>
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
    <div class="form__input-wrap">
      <input
        class="input"
        type="password"
        v-model="passwordConfirm"
        placeholder="Повторите пароль"
      />
    </div>
    <div class="form__button-wrap">
      <base-button title="Регистрация" :is-loading="isLoading" type="submit" />
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
      passwordConfirm: "",
    };
  },
  methods: {
    send() {
      if (this.passwordConfirm !== this.form.password) {
        alert("Пароли не совпадают!");
        return;
      }
      this.$emit("send", this.form);
    },
  },
});
</script>

<style scoped lang="scss"></style>
