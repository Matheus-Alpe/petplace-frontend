import { routes as pages } from '@/pages'
import { routes as auth } from '@/modules/auth'
import { routes as user } from '@/modules/user'

export default [
    ...pages,
    ...auth,
    ...user,
]