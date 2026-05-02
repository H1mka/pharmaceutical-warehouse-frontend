import { useState } from 'react'
import { useMedicineTableContext } from '../../providers/MedicineTableProvider'

const TableNameSearch = ({ className = '' }) => {
  const [search, setSearch] = useState('')
  const { fetchAllMedicines } = useMedicineTableContext()

  const submitSearch = (searchValue = search) => {
    if (typeof fetchAllMedicines !== 'function') return ''

    fetchAllMedicines({ name: searchValue })
  }

  const handleReset = () => {
    setSearch('')
    submitSearch('')
  }

  return (
    <div className={`flex gap-2 ${className}`}>
      <input
        className='w-full max-w-md rounded-xl border border-gray-300 px-4 py-2.5 text-md shadow-sm outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-(--primary-blue)'
        type='text'
        placeholder='Search product...'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button className='btn bg-(--primary-blue)' onClick={() => submitSearch()}>
        Search
      </button>
      <button className='btn bg-(--primary-blue)' onClick={handleReset}>
        Reset
      </button>
    </div>
  )
}

export default TableNameSearch
