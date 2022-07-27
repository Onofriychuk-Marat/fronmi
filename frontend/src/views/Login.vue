<template>
  <div class="page center-h">
    <div class="page__title title">Fronmi приветствует тебя!</div>
    <div class="center">
      <div class="wrap-forms">
        <div class="wrap-form">
          <form-login @send="login" :is-loading="isLogining" />
        </div>
        <div class="wrap-form">
          <form-registration
            @send="registration"
            :is-loading="isRegistration"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IUserEntrance } from "@/types/user";
import useAxios from "@/hooks/use-axios";
import { IAuthResponse } from "@/types/auth";
import { AppLiteral } from "@/types/app-literal";
import { useRouter } from "vue-router";
import FormLogin from "@/components/forms/FormLogin.vue";
import FormRegistration from "@/components/forms/FormRegistration.vue";

import axios from "@/plugins/axios";
// import axios from "axios";
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const axios: AxiosInstance = require("./plugins/axios.ts");

export default defineComponent({
  components: {
    FormLogin,
    FormRegistration,
  },
  setup(context: any) {
    const router = useRouter();

    const [login, isLogining] = useAxios(async (user: IUserEntrance) => {
      const { token } = (await axios.post<IAuthResponse>("/auth/login", user))
        .data;
      localStorage.setItem(AppLiteral.STORED_TOKEN, token);
      router.push("/home");
    });
    const [registration, isRegistration] = useAxios(
      async (user: IUserEntrance) => {
        const { token } = (
          await axios.post<IAuthResponse>("/auth/registration", user)
        ).data;
        localStorage.setItem(AppLiteral.STORED_TOKEN, token);
        router.push("/home");
      }
    );

    return {
      login,
      isLogining,
      registration,
      isRegistration,
    };
  },
});
</script>

<style scoped lang="scss">
.title {
  margin-top: 20vh;
}
.wrap-forms {
  margin-top: 100px;
  display: flex;
}

.wrap-form {
  & + & {
    margin-left: 20px;
  }
}
</style>
