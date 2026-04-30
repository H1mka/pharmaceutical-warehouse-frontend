import React, { createContext, useState, useContext, useEffect } from 'react'
import { useMedicines } from '../../hooks'

const MedicineTableContext = createContext()

export const MedicineTableProvider = ({ children, isSingleSelect = false }) => {
  const [selected, setSelected] = useState(isSingleSelect ? null : [])

  const medicineData = useMedicines()

  /**
   * Select rows logic
   */
  const isRowSelected = (value) => {
    if (Array.isArray(selected)) return selected.some((item) => item.id === value.id)
    else return selected?.id === value.id
  }

  const clearSelected = () => setSelected(isSingleSelect ? null : [])

  const toggleSelectRow = (value) => {
    if (isSingleSelect) {
      setSelected((prev) => {
        return prev?.id === value.id ? null : value
      })
    } else {
      setSelected(isRowSelected(value) ? selected.filter((item) => item.id !== value.id) : [...selected, { ...value }])
    }
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
