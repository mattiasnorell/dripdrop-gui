import { RouteLink } from '../models/Route';

const Start = () => import(/* webpackChunkName: "main" */ '../pages/start/start');

const $mainRoutes = <RouteLink[]>[
    {
        name: 'start',
        path: '/',
        component: Start,
        props: false,
        meta: {}
    }
];

export { $mainRoutes };
