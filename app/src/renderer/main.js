import Vue from 'vue'
import Electron from 'vue-electron'
import Resource from 'vue-resource'
import Router from 'vue-router'

import App from './App'
import routes from './routes'
import Vodal from 'vodal';

// register the plugin on vue
import Toasted from 'vue-toasted';

import "vodal/common.css";
import "vodal/rotate.css";

Vue.use(Toasted)

Vue.use(Electron)
//Vue.use(Resource)
Vue.use(Router)
Vue.config.debug = true
Vue.component(Vodal.name, Vodal);

const router = new Router({
  scrollBehavior: () => ({y: 0}),
  routes
})

/* eslint-disable no-new */
new Vue({
  router,
  ...App
}).$mount('#app')
