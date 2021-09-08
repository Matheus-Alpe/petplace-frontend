import { api } from '@/http'

export default {
    registerUser: { method: 'post', url: '/register-user' },
    // updateUser: (payload) => api({ method: 'put', url: '/update-user', data: payload }),
    deleteUser: (payload) => api({ method: 'post', url: '/delete-user', data: payload }),
    uploadImage: { method: 'post', url: '/upload' }
}