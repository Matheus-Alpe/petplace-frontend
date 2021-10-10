import { api } from '@/http'

export default {
    registerPet: (payload) => api({ method: 'post', url: '/register-pet', data: payload }),
    // updatePet: (payload) => api({ method: 'put', url: '/update-pet', data: payload }),
    deletePet: (payload) => api({ method: 'post', url: '/delete-pet', data: payload }),
}