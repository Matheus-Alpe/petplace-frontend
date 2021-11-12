import { api } from '@/http'

export default {
    registerUser: (payload) => api({ method: 'post', url: '/register-user', data: payload }),
    updateUser: (payload) => api({ method: 'put', url: '/update-user', data: payload }),
    deleteUser: (payload) => api({ method: 'post', url: '/delete-user', data: payload }),
    findUserById: (payload) => api({ method: 'post', url: '/find-user', data: { id: payload }})
}