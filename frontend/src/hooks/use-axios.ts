import { ref, Ref } from "vue";

type hookUseAxiosReturn<T, E> = [(data: T) => any, Ref<boolean>];

export default function <T, E>(func: (arg0: T) => E): hookUseAxiosReturn<T, E> {
  const isSend = ref(false);

  async function handlerCreate(data: T) {
    isSend.value = true;
    try {
      await func(data);
    } catch (error: any) {
      alert(error?.response?.data?.message || "Ошибка!");
    }
    isSend.value = false;
  }
  return [handlerCreate, isSend];
}
