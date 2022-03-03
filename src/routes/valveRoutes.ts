import { Route } from 'vue-router/types/router';
import { RouteLink } from '../models/Route';

const ValvesList = () => import(/* webpackChunkName: "valves" */ '../pages/valves/valvesList');
const ValveEdit = () => import(/* webpackChunkName: "valves" */ '../pages/valves/valvesEdit');

const $valveRoutes = <RouteLink[]>[
    {
        name: 'valvesList',
        path: '/valves',
        component: ValvesList,
        props: false
    },
    {
        name: 'valvesEdit',
        path: '/valves/:id',
        component: ValveEdit,
        props: (route: Route) => ({ id: Number(route.params.id) }),
        meta: {}
    }
];

export { $valveRoutes };
