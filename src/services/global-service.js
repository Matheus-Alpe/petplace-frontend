import { api } from '@/http'

export default {
    uploadUserImage: (payload) => api({ method: 'post', url: '/user-upload', data: payload }),
    uploadPetImage: (payload) => api({ method: 'post', url: '/pet-upload', data: payload })
}