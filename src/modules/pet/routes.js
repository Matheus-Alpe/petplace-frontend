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
            },
            {
                path: 'profile',
                name: 'Pet Profile',
                component: () => import(/* webpackChunkName: "pet-profile" */ './_pages/PetProfile.vue'),
            }
        ]
    },
];
