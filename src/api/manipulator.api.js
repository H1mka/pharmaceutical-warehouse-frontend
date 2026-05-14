import api from './api'

const manipulatorApi = {
  getAll: (params) => api.get('/control-panel/logs', { params }),
  createLog: (data) => api.post('/control-panel/logs', data),
  getState: () => api.get('/control-panel/manipulator-state'),
  updateState: (status) => api.patch('/control-panel/manipulator-state', { status }),
}

export default manipulatorApi
