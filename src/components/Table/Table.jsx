import { useEffect, useState } from 'react'
import { useTableContext } from '../../providers/TableProvider'

import './Table.scss'

const capitalizeLetter = (value = '') => {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

const formatHeaderColumnName = (column = '') => {
  const columnSplit = column.split(/[-_]/)
  columnSplit[0] = capitalizeLetter(columnSplit[0])

  return columnSplit.join(' ')
}

const Table = ({ className = '', externalHeaders, externalData }) => {
  const { data = [], selected, setSelected, isRowSelected, toggleSelectRow } = useTableContext()

  const internalHeaders = Object.keys(data[0] || {}).map((item) => {
    return { title: formatHeaderColumnName(item), value: item }
  })

  // show externalHeaders when it's given
  const headers = Array.isArray(externalHeaders) ? externalHeaders : internalHeaders
  const mainData = Array.isArray(externalData) ? externalData : data

  console.log(headers)
  return (
    <div>
      <table className={`table ${className}`}>
        <thead>
          <tr>
            {headers.map((head, index) => {
              return <th key={index}>{head.title}</th>
            })}
          </tr>
        </thead>
        <tbody>
          {mainData.map((dataItem) => {
            return (
              <tr
                className={`hover:bg-base-300 ${isRowSelected(dataItem) && 'active-row'}`}
                key={dataItem.id}
                onClick={() => toggleSelectRow(dataItem, 'tr')}
              >
                {headers.map((headItem, index) => {
                  return <td key={index}>{String(dataItem[headItem.value])}</td>
                })}
                <td>
                  <label>
                    <input type='checkbox' className='checkbox' checked={isRowSelected(dataItem)} readOnly />
                  </label>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Table
