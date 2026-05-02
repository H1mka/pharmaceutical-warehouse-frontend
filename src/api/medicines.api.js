import api from './api'

const medicinesApi = {
  getAll: (params) => api.get('/products', { params }),
  dispense: (sku, data) => api.post(`/products/${sku}/dispense`, data),
}

export default medicinesApi
