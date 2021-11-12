import { api } from '@/http'

export default {
    createTerm: (payload) => api({ method: 'post', url: '/create-term', data: { responsibilityTerm: payload } }),
    update: (payload) => api({ method: 'put', url: '/update-term', data: { responsibilityTerm: payload } }),
}