import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import $axios from "./helpers/interceptors";
loadFonts()


const app = createApp(App);


app.config.globalProperties.$axios = $axios;

  app.use(router)
  .use(store)
  .use(vuetify)
  .use(store)
  
  .mount('#app')
