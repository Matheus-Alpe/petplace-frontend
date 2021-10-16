import { api } from '@/http'

export default {
    registerVetHistory: (payload) => api({ method: 'post', url: '/create-vetHistory', data: payload }),
    updateVetHistory: (payload) => api({ method: 'put', url: '/update-vetHistory', data: payload }),
    deleteVetHistory: (payload) => api({ method: 'post', url: '/delete-vetHistory', data: payload }),
}