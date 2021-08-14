import VueRouter, { RouterOptions } from 'vue-router';

import { $mainRoutes } from './mainRoutes';
import { $sensorRoutes } from './sensorRoutes';
import { $settingsRoutes } from './settingsRoutes';
import { $valveRoutes } from './valveRoutes';

const routes = [...$mainRoutes, ...$valveRoutes, ...$sensorRoutes, ...$settingsRoutes];

const options: RouterOptions = { mode: 'hash', linkActiveClass: 'active-class', routes: routes };
const router = new VueRouter(options);

router.beforeEach(async (to, from, next) => {
    next();
});

router.afterEach(async (to) => {});

export { router };
