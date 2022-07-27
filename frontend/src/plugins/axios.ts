import axiosModule, { AxiosInstance } from "axios";
import { App } from "vue";
import { AppLiteral } from "@/types/app-literal";

// export default {
//   install(app: App) {
//     const axios = axiosModule.create({
//       baseURL: process.env.VUE_APP_BASE_URL,
//     });
//     axios.interceptors.request.use((config: any) => {
//       config.requireToken =
//         config.requireToken === undefined || config.requireToken;
//       if (!config.requireToken || config.headers?.Authorization) {
//         return config;
//       }
//       if (localStorage.getItem(AppLiteral.STORED_TOKEN)) {
//         (config.headers as any).Authorization =
//           "Bearer " + localStorage.getItem(AppLiteral.STORED_TOKEN);
//       }
//       return config;
//     });

//     axios.interceptors.response.use((config: any) => {
//       const newToken = config.headers["Authorization"];
//       if (newToken) {
//         localStorage.setItem(AppLiteral.STORED_TOKEN, newToken);
//       }
//       return config;
//     });

//     app.config.globalProperties.$axios = axios;
//   },
// };

const axios: AxiosInstance = axiosModule.create({
  baseURL: process.env.VUE_APP_BASE_URL,
});

axios.interceptors.request.use((config: any) => {
  config.requireToken =
    config.requireToken === undefined || config.requireToken;
  if (!config.requireToken || config.headers?.Authorization) {
    return config;
  }
  if (localStorage.getItem(AppLiteral.STORED_TOKEN)) {
    (config.headers as any).Authorization =
      "Bearer " + localStorage.getItem(AppLiteral.STORED_TOKEN);
  }
  return config;
});

axios.interceptors.response.use((config: any) => {
  const newToken = config.headers["Authorization"];
  if (newToken) {
    localStorage.setItem(AppLiteral.STORED_TOKEN, newToken);
  }
  return config;
});

export default axios;
