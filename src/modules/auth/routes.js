export default [
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import(/* webpackChunkName: "login" */ './_pages/Login.vue'),
    },
];
