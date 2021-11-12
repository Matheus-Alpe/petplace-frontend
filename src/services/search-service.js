import { api } from '@/http'

export default {
    searchByProperty: (payload) => api({ method: 'post', url: '/search-pets-by', data: payload }),
    getAllAvailablePets: () => api({ method: 'post', url: '/search-pets-by', data: {
        property: 'adoptable',
        value: true
    }}),
}