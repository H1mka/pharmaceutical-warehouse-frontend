import { useState } from 'react'
import Table from '../components/table/Table'
import TablePagination from '../components/table/TablePagination'
import TableNameSearch from '../components/table/TableNameSearch'
import Loader from '../components/Loader'
import QRScanner from '../components/QRScanner'
import MedicineTableActions from '../components/medicines/MedicineTableActions'
import DispenseProductModal from '../components/medicines/DispenseProductModal'

import { useMedicineTableContext } from '../providers/MedicineTableProvider'

const PharmacistView = () => {
  const { isLoading, dispenseMedicine, clearSelected } = useMedicineTableContext()
  const [dispenseMedicineItem, setDispenseMedicineItem] = useState(null)

  const handleDispenseSubmit = async (data) => {
    await dispenseMedicine(dispenseMedicineItem?.sku, data)
    clearSelected()
  }

  return (
    <div className='pharmacist-view-wrapper'>
      <MedicineTableActions onDispense={setDispenseMedicineItem} />

      <TableNameSearch className={'mb-4'} />

      <Table className={'mb-4'} />

      <TablePagination />

      <Loader isLoading={isLoading} />

      <DispenseProductModal
        isOpen={Boolean(dispenseMedicineItem)}
        medicine={dispenseMedicineItem}
        onClose={() => setDispenseMedicineItem(null)}
        onSubmit={handleDispenseSubmit}
      />
    </div>
  )
}

export default PharmacistView
