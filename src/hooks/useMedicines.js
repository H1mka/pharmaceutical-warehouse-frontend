import { useState, useEffect } from 'react'
import { medicinesApi } from '../api'
import { subscribeToProductUpdates } from '../services/productMqtt'

const useMedicines = () => {
  const [medicines, setMedicines] = useState([])
  const [pagination, setPagination] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [mqttStatus, setMqttStatus] = useState('idle')

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

  const dispenseMedicine = async (sku, data) => {
    if (!sku || typeof data !== 'object') return

    try {
      setIsLoading(true)

      const response = await medicinesApi.dispense(sku, data)

      if (response.status < 200 || response.status > 205) return

      await fetchAllMedicines()
      return response.data
    } catch (error) {
      console.error('Error while dispensing Medicine:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const receiveMedicine = async (sku, data) => {
    if (!sku || typeof data !== 'object') return

    try {
      setIsLoading(true)

      const response = await medicinesApi.receive(sku, data)

      if (response.status < 200 || response.status > 205) return

      await fetchAllMedicines()
      return response.data
    } catch (error) {
      console.error('Error while receiving Medicine:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const deleteMedicine = async (sku) => {
    if (!sku) return

    try {
      setIsLoading(true)

      const response = await medicinesApi.delete(sku)

      if (response.status < 200 || response.status > 205) return

      await fetchAllMedicines()
      return response.data
    } catch (error) {
      console.error('Error while deleting Medicine:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const applyProductUpdate = (message) => {
    const { event, product } = message || {}
    if (!event || !product?.id) return

    setMedicines((prev) => {
      if (event === 'PRODUCT_DELETED') {
        return prev.filter((item) => item.id !== product.id)
      }

      const productIndex = prev.findIndex((item) => item.id === product.id)

      if (productIndex === -1) {
        return [product, ...prev]
      }

      return prev.map((item, index) => (index === productIndex ? { ...item, ...product } : item))
    })
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchAllMedicines()
    }, 0)

    return () => clearTimeout(timeoutId)
  }, [])

  useEffect(() => {
    return subscribeToProductUpdates({
      onMessage: applyProductUpdate,
      onStatusChange: setMqttStatus,
    })
  }, [])

  return {
    fetchAllData: fetchAllMedicines,
    dispenseMedicine,
    receiveMedicine,
    deleteMedicine,
    data: medicines,
    pagination,
    isLoading,
    mqttStatus,
  }
}

export default useMedicines
