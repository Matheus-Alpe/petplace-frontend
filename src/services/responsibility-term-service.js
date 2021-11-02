import { api } from '@/http'

export default {
    createTerm: (payload) => api({ method: 'post', url: '/create-term', data: payload }),
}