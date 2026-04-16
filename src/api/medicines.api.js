import api from './api'

const medicinesApi = {
  getAll: (params) => api.get('/products', { params }),
}

export default medicinesApi
