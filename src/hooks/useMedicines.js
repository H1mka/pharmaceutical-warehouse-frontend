import { useState, useEffect } from 'react'
import { medicinesApi } from '../api'

const useMedicines = () => {
  const [medicines, setMedicines] = useState([])
  const [pagination, setPagination] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const fetchAllMedicines = async (params = {}) => {
    try {
      if (typeof params !== 'object') params = {}

      setIsLoading(true)

      const response = await medicinesApi.getAll(params)

      if (response.status < 200 || response.status > 205) return

      setMedicines(response.data.data)
      setPagination(response.data.extra)
    } catch (error) {
      console.error('Error while fetching Medicines:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchAllMedicines()
  }, [])

  return { fetchAllMedicines, medicines, pagination, isLoading }
}

export default useMedicines
