import Vue from 'vue';
import App from './App.vue';
// import 'vue-pupop-toast/dist/vue-pupop-toast.css';
import VuePupopToast from '@/lib/vue-pupop-toast-master/src';

Vue.config.productionTip = false;

Vue.use(VuePupopToast);

new App().$mount();
