export default [
    {
        path: '/search',
        name: 'Search',
        component: () => import(/* webpackChunkName: "search" */ './search/Search.vue'),
    },
];
