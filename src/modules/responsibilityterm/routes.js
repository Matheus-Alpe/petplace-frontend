export default [
    {
        path: '/terms',
        name: 'Terms',
        component: () => import(/* webpackChunkName: "terms" */ './_pages/Terms.vue'),
    },
];
