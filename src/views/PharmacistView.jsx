import { useState } from 'react'
import Table from '../components/Table/Table'
import TablePagination from '../components/Table/TablePagination'
import TableNameSearch from '../components/Table/TableNameSearch'
import Loader from '../components/Loader'
import QRScanner from '../components/QRScanner'
import MedicineTableActions from '../components/medicines/MedicineTableActions'
import DispenseProductModal from '../components/medicines/DispenseProductModal'
import ReceiveProductModal from '../components/medicines/ReceiveProductModal'

import { useTableContext } from '../providers/TableProvider'

const PharmacistView = () => {
  const { isLoading, dispenseMedicine, receiveMedicine, clearSelected } = useTableContext()
  const [dispenseMedicineItem, setDispenseMedicineItem] = useState(null)
  const [receiveMedicineItem, setReceiveMedicineItem] = useState(null)

  const handleDispenseSubmit = async (data) => {
    await dispenseMedicine(dispenseMedicineItem?.sku, data)
    clearSelected()
  }

  const handleReceiveSubmit = async (data) => {
    await receiveMedicine(receiveMedicineItem?.sku, data)
    clearSelected()
  }

  return (
    <div className='pharmacist-view-wrapper'>
      <MedicineTableActions onDispense={setDispenseMedicineItem} onReceive={setReceiveMedicineItem} />

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

      <ReceiveProductModal
        isOpen={Boolean(receiveMedicineItem)}
        medicine={receiveMedicineItem}
        onClose={() => setReceiveMedicineItem(null)}
        onSubmit={handleReceiveSubmit}
      />
    </div>
  )
}

export default PharmacistView
