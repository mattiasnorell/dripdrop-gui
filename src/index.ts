import Vue from 'vue';
import VueRouter from 'vue-router';

import './style/style.css';
import { $filters } from './filters';
import { router } from './routes/initRoutes';
import { library } from '@fortawesome/fontawesome-svg-core';

import {
  faCog, faFaucet, faHome, faPlus, faPowerOff, faStopwatch, faThermometerHalf, faTrashAlt, faSpinner, faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';
import buildContainer from './inversify.config';

const appElement: HTMLElement | null = document.getElementById('app');

if (appElement) {
  buildContainer();

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
    faFaucet,
    faSpinner,
    faExclamationTriangle
  );

  new Vue({
    router
  }).$mount(appElement);
}
