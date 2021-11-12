
import { api } from '@/http'

export default {
    login: (payload) => api({ method: 'post', url: '/login', data: payload }),
    loadSession: () => api({ method: 'get', url: '/load-session' }),
}