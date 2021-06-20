export default [
    {
        path: '/',
        alias: ['/home'],
        name: 'home',
        component: () =>
            import(/* webpackChunkName: "home" */ './Home.vue'),
    },
];
