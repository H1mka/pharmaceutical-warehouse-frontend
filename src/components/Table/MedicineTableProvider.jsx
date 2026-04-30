import React, { createContext, useState, useContext, useEffect } from 'react'
import { useMedicines } from '../../hooks'

const MedicineTableContext = createContext()

export const MedicineTableProvider = ({ children }) => {
  const [selected, setSelected] = useState([])

  const medicineData = useMedicines()

  /**
   * Select rows logic
   */
  const isRowSelected = (value) => selected.some((item) => item.id === value.id)
  const clearSelected = () => setSelected([])
  const toggleSelectRow = (value, msg) => {
    if (isRowSelected(value)) {
      setSelected(selected.filter((item) => item.id !== value.id))
      return
    }

    setSelected([...selected, { ...value }])
  }

  const providerValue = {
    ...medicineData,
    selected,
    setSelected,
    toggleSelectRow,
    isRowSelected,
    clearSelected,
  }

  return <MedicineTableContext.Provider value={providerValue}>{children}</MedicineTableContext.Provider>
}

export const useMedicineTableContext = () => useContext(MedicineTableContext)
