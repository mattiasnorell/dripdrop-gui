import { Route } from 'vue-router/types/router';
import { RouteLink } from '../models/Route';

const Sensors = () => import(/* webpackChunkName: "sensors" */ '../pages/sensors/sensors');

const $sensorRoutes = <RouteLink[]>[
    {
        name: 'sensors',
        path: '/sensors',
        component: Sensors,
        props: false
    }
];

export { $sensorRoutes };
