import AuthContainer from './_pages/AuthContainer.vue'

export default [
    {
        path: '/auth',
        component: AuthContainer,
        children: [
            {
                path: 'login',
                alias: ['logar', 'entrar'],
                name: 'Login',
                component: () => import(/* webpackChunkName: "login" */ './_pages/Login.vue'),
            },
            {
                path: 'register',
                alias: ['cadastrar', 'criar'],
                name: 'Login',
                component: () => import(/* webpackChunkName: "register" */ './_pages/Register.vue'),
            },
        ]
    },
];
