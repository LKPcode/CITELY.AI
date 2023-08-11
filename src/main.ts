import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router/index.ts"
import Notifications from '@kyvg/vue3-notification'
import velocity from 'velocity-animate'


let app = createApp(App)
app.use(router)
app.use(Notifications, { velocity })

app.mount('#app')
