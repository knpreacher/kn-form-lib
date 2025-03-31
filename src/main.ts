import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { BottomSheet, Dialog, Quasar } from 'quasar'

const app = createApp(App)

app.use(Quasar, {
  plugins: {
    Dialog,
    BottomSheet
  }
})

app.mount('#app')
