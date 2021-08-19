import Vue from 'vue';
import VueRouter from 'vue-router';

import './style/style.css';
import { $filters } from './filters';
import { router } from './routes/initRoutes';
import { library } from '@fortawesome/fontawesome-svg-core';

import {
  faCog, faFaucet, faHome, faPlus, faPowerOff, faStopwatch, faThermometerHalf, faTrashAlt
} from '@fortawesome/free-solid-svg-icons';
import buildContainer from './inversify.config';

Vue.use($filters);
Vue.use(VueRouter);

library.add(
  faCog,
  faHome,
  faStopwatch,
  faPowerOff,
  faTrashAlt,
  faPlus,
  faThermometerHalf,
  faFaucet
);

const appElement: HTMLElement | null = document.getElementById('app');

if (appElement) {
  buildContainer();
  
  new Vue({
    router
  }).$mount(appElement);
}
