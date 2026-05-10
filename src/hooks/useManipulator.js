import { useState, useEffect } from 'react'
import { manipulatorApi } from '../api'

const useManipulator = () => {
  const [logs, setLogs] = useState([])
  const [pagination, setPagination] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const fetchAllLogs = async (params) => {
    try {
      setIsLoading(true)

      const response = await manipulatorApi.getAll(params)

      if (response.status < 200 || response.status > 205) return

      setLogs(response.data.data)
      setPagination(response.data.extra)
    } catch (error) {
      console.error('Error while fetching manipulator logs:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchAllLogs()
  }, [])

  return { fetchAllData: fetchAllLogs, data: logs, pagination, isLoading }
}

export default useManipulator
