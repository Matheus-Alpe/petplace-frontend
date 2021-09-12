export default [
    {
        path: '/login',
        alias: ['/cadastrar'],
        name: 'Login',
        component: () =>
            import(/* webpackChunkName: "login" */ './_pages/Login.vue'),
    },
];
