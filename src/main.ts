import { createApp } from 'vue'
import App from './App.vue'
import { router } from './app/router'
import { pinia } from './app/stores'
import { logger } from './shared/logger'
import './styles/global.css'

logger.info('DataVisionLab application bootstrapping')

createApp(App).use(pinia).use(router).mount('#app')
