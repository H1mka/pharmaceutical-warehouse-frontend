import api from './api'

const analyticsApi = {
  getDispenseLoad: (params) => api.get('/analytics/dispense-load', { params }),
}

export default analyticsApi
