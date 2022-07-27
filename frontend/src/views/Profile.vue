<template>
  <div class="page">
    <div class="page__header">
      <base-button
        :icon="require('@/assets/images/home.svg')"
        @click="$router.replace('/home')"
      />
      <base-button
        :icon="require('@/assets/images/exit.svg')"
        @click="logout"
      />
    </div>
    <div class="page__title title">Профиль</div>
    <div class="form-wrap">
      <div v-if="isGetingProfile">Загрузка....</div>
      <form-profile
        v-else
        :profile="profile"
        @send="update"
        :is-loading="isUpdating"
      />
    </div>
  </div>
</template>

<script lang="ts">
import useAxios from "@/hooks/use-axios";
import { AppLiteral } from "@/types/app-literal";
import { IUser, IUserEntrance } from "@/types/user";
import { defineComponent, Ref, ref } from "vue";
import BaseButton from "@/components/buttons/BaseButton.vue";
import FormProfile from "@/components/forms/FormProfile.vue";
import axios from "@/plugins/axios";
import { IChannelResponse } from "@/types/channel";

export default defineComponent({
  components: {
    BaseButton,
    FormProfile,
  },
  setup() {
    const profile = ref({
      id: -1,
      login: "",
      channels: [] as IChannelResponse[],
    }) as Ref<IUser>;

    const [update, isUpdating] = useAxios(async (user: IUserEntrance) => {
      profile.value = (await axios.patch("/profile", user)).data;
    });

    const [getProfile, isGetingProfile] = useAxios(async () => {
      profile.value = (await axios.get("/profile")).data;
    });
    getProfile(undefined);

    return {
      profile,
      update,
      isUpdating,
      isGetingProfile,
    };
  },
  methods: {
    logout() {
      localStorage.removeItem(AppLiteral.STORED_TOKEN);
      this.$router.replace("/login");
    },
  },
});
</script>

<style scoped lang="scss">
.title {
  margin-top: 40px;
}
.form-wrap {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}
</style>
