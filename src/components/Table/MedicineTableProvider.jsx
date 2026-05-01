import React, { createContext, useState, useContext, useEffect, useMemo } from 'react'
import { useMedicines } from '../../hooks'

const MedicineTableContext = createContext()

export const MedicineTableProvider = ({ children, isSingleSelect = false }) => {
  const [selected, setSelected] = useState(isSingleSelect ? null : [])

  const medicineData = useMedicines()

  /**
   * Select rows logic
   */
  const isRowSelected = (value) => {
    return isSingleSelect ? selected?.id === value.id : selected.some((item) => item.id === value.id)
  }

  const clearSelected = () => setSelected(isSingleSelect ? null : [])

  const toggleSelectRow = (value) => {
    if (!value?.id) return

    setSelected((prev) => {
      if (isSingleSelect) {
        return prev?.id === value.id ? null : value
      }

      const isAlreadySelected = isRowSelected(value)
      return isAlreadySelected ? selected.filter((item) => item.id !== value.id) : [...selected, { ...value }]
    })
  }

  useEffect(() => {
    console.log(selected)
  }, [selected])

  const providerValue = useMemo(
    () => ({
      ...medicineData,
      selected,
      setSelected,
      toggleSelectRow,
      isRowSelected,
      clearSelected,
      isSingleSelect,
    }),
    [medicineData, selected, toggleSelectRow, isRowSelected, clearSelected, isSingleSelect]
  )

  return <MedicineTableContext.Provider value={providerValue}>{children}</MedicineTableContext.Provider>
}

export const useMedicineTableContext = () => useContext(MedicineTableContext)
