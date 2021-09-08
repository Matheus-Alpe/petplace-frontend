export default [
    {
        path: '/',
        alias: ['/home'],
        name: 'Home',
        component: () =>
            import(/* webpackChunkName: "home" */ './home/Home.vue'),
    },
];
