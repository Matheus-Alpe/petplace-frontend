import { routes as pages } from '@/pages'
import { routes as auth } from '@/modules/auth'
import { routes as user } from '@/modules/user'
import { routes as pet } from '@/modules/pet'

export default [
    ...pages,
    ...auth,
    ...user,
    ...pet,

    // fallback for invalid endpoints
    {
        path: '*',
        redirect: '/auth/login'
    }
]