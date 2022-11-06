import Vue from 'vue'
import {
  ToastPlugin,
  ModalPlugin,
  BootstrapVue,
  BootstrapVueIcons,
} from 'bootstrap-vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './App.vue'

import router from './router'
import store from './store'

import { initialize } from './axios/general'

Vue.use(ToastPlugin)
Vue.use(ModalPlugin)
Vue.use(BootstrapVue, {
  BModal: { headerBgVariant: 'primary', titleClass: 'text-light' },
  breakpoints: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
})
Vue.use(BootstrapVueIcons)


Vue.config.productionTip = false

initialize(router);

export const bus = new Vue();

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
