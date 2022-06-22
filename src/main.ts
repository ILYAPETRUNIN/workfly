import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/stylus/index.styl'

import globalComponents from '@/components'
export const app = createApp(App)

app
  .use(store)
  .use(router)
  .mount('#app')

Object.entries(globalComponents).forEach(([name, component]) => app.component(name, component))
