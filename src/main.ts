import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

import { useColorStore } from './stores/colors';
import './assets/main.scss';

(async () => {
  createApp(App)
    .use(createPinia())
    .mount('#app');

  useColorStore().loadLegoColors();

})();

