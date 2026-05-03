import api from './api'

const analyticsApi = {
  getDispenseLoad: (params) => api.get('/analytics/dispense-load', { params }),
  getProductPopularity: (params) => api.get('/analytics/products/popularity', { params }),
}

export default analyticsApi
