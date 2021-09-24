import PetContainer from './_pages/PetContainer.vue'

export default [
    {
        path: '/pet',
        component: PetContainer,
        children: [
            {
                path: 'register',
                name: 'Pet Register',
                component: () => import(/* webpackChunkName: "pet-register" */ './_pages/PetRegister.vue'),
            }
        ]
    },
];
