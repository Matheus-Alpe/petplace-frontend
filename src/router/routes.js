import { routes as pages } from '@/pages'
import { routes as auth } from '@/modules/auth'
import { routes as user } from '@/modules/user'
import { routes as pet } from '@/modules/pet'
import { routes as responsibilityTerm } from '@/modules/responsibilityterm'

export default [
    ...pages,
    ...auth,
    ...user,
    ...pet,
    ...responsibilityTerm,

    // fallback for invalid endpoints
    // {
    //     path: '*',
    //     redirect: '/auth/login'
    // }
]