import { api } from '@/http'

export default {
    uploadImage: (payload) => api({ method: 'post', url: '/upload', data: payload })
}