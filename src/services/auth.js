
import { api } from '../http'

export default {
    login: (payload) => api({ method: 'post', url: '/login', data: payload }),
    loadSession: { method: 'get', url: '/load-session' },
    registerUser: { method: 'post', url: '/register-user' },
    updateUser: { method: 'put', url: '/update-user' },
    deleteUser: { method: 'post', url: '/delete-user' },
    uploadImage: { method: 'post', url: '/upload' }
}