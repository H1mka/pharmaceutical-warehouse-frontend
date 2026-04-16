import { useState, useEffect } from 'react'
import { useMedicines } from '../hooks'
import Table from '../components/Table'
import TablePagination from '../components/TablePagination'

const PharmacistView = () => {
  const { medicines, pagination, fetchAllMedicines } = useMedicines()

  // let findedMed = medications.filter((item) => {
  //   if (searchingMed.length > 0) return item.name.toLowerCase().includes(searchingMed.toLowerCase())
  // })

  return (
    <div>
      <Table data={medicines} />
      <TablePagination pagination={pagination} fetchData={fetchAllMedicines} />

      {/* <h1>Medications</h1>
      <input
        className='input validator outline-none border-[#ecf9ff99]'
        type='search'
        id='search'
        placeholder='Search'
        value={searchingMed}
        onChange={(e) => setSearchingMed(e.target.value)}
      />
      <div>
        {' '}
        <h2>Are you looking for this?</h2>
        {findedMed.map((item) => (
          <div key={item.id}>
            <ul>
              <li>{item.name}</li>
              <li>{item.category}</li>
            </ul>
          </div>
        ))}
      </div> */}
    </div>
  )
}

export default PharmacistView
