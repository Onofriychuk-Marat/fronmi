<template>
  <form @submit.prevent="send" class="form">
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
        type="password"
        class="input"
        v-model="passwordConfirm"
        placeholder="Повторите пароль"
      />
    </div>
    <div class="form__button-wrap">
      <base-button title="Обновить" :is-loading="isLoading" type="submit" />
    </div>
  </form>
</template>

<script lang="ts">
import { IUser, IUserEntrance } from "@/types/user";
import { defineComponent, Ref, ref, watch } from "vue";
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
    profile: {
      type: Object as () => IUser,
      required: true,
    },
  },
  emits: {
    send: (_user: IUserEntrance) => true,
  },
  setup(props) {
    const form = ref({
      login: props.profile.login,
    }) as Ref<IUserEntrance>;
    const passwordConfirm = ref("");
    watch(
      () => props.profile,
      () => {
        form.value.login = props.profile.login;
      }
    );

    return {
      passwordConfirm,
      form,
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
