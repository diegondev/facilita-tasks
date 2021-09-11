import Vue from 'vue';
import App from './App.vue';
import router from './router';
import configureFontAwesome from './services/font-awesomw';

configureFontAwesome(Vue);

Vue.config.productionTip = false;

import '@/assets/styles/index.styl';

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
