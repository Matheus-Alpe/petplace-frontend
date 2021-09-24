export default [
    {
        path: '/',
        alias: ['/home'],
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ './home/Home.vue'),
    },
    {
        path: '/search',
        name: 'Search',
        component: () => import(/* webpackChunkName: "search" */ './search/Search.vue'),
    },
];
