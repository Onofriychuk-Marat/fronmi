/* eslint-disable */
import axios from './plugins/axios'

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// declare module '@vue/runtime-core' {
//   interface ComponentCustomProperties {
//     $axios: AxiosStatic
//   }
// }

// interface WindowApp {
//   $router: Router;
//   $route: RouteLocationNormalizedLoaded,
// }