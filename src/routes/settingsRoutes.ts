import { RouteLink } from '../models/Route';

const Settings = () => import(/* webpackChunkName: "settings" */ '../pages/settings/settings');

const $settingsRoutes = <RouteLink[]>[
    {
        name: 'settings',
        path: '/settings',
        component: Settings,
        props: false,
        meta: {}
    }
];

export { $settingsRoutes };
