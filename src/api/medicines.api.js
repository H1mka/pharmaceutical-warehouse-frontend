import api from './api'

const medicinesApi = {
  getAll: (params) => api.get('/products', { params }),
  delete: (sku) => api.delete(`/products/${sku}`),
  receive: (sku, data) => api.post(`/products/${sku}/receive`, data),
  dispense: (sku, data) => api.post(`/products/${sku}/dispense`, data),
}

export default medicinesApi
