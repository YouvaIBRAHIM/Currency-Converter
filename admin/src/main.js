import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import { createApp } from 'vue'
import App from '@/App.vue'
import router from "@/router";

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import * as labsComponents from 'vuetify/labs/components'

const vuetify = createVuetify({
  components: { ...components, ...labsComponents },
  directives,
  icons: { defaultSet: 'mdi' }
})

createApp(App)
.use(vuetify)
.use(router)
.mount('#app')
