// src/main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import router from './router'
import App from './App.vue'
import './assets/tokens.css'

const app = createApp(App)
const pinia = createPinia()
pinia.use(createPersistedState())
app.use(pinia)
app.use(router)
app.mount('#app')
