export default [
    {
        path: '/profile',
        name: 'Profile',
        component: () =>
            import(/* webpackChunkName: "profile" */ './_pages/Profile.vue'),
    },
];
