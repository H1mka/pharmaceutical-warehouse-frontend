import React, { createContext, useState, useContext, useEffect, useMemo } from 'react'

const TableContext = createContext()

export const TableProvider = ({ children, dataHook = Function, isSingleSelect = false }) => {
  const [selected, setSelected] = useState(isSingleSelect ? null : [])

  const data = typeof dataHook === 'function' ? dataHook() : {}

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
      ...data,
      selected,
      setSelected,
      toggleSelectRow,
      isRowSelected,
      clearSelected,
      isSingleSelect,
    }),
    [data, selected, toggleSelectRow, isRowSelected, clearSelected, isSingleSelect]
  )

  return <TableContext.Provider value={providerValue}>{children}</TableContext.Provider>
}

export const useTableContext = () => useContext(TableContext)
