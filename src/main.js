import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ClickOutside from './shared/directives/click-outside/ClickOutside';
import configureFontAwesome from './services/font-awesomw';
import '@/assets/styles/index.styl';

configureFontAwesome(Vue);

Vue.config.productionTip = false;
Vue.directive('click-outside', ClickOutside);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
