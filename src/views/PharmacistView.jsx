import { useState } from 'react'
import Table from '../components/Table/Table'
import TablePagination from '../components/Table/TablePagination'
import TableNameSearch from '../components/Table/TableNameSearch'
import Loader from '../components/Loader'
import QRScanner from '../components/QRScanner'
import MedicineTableActions from '../components/medicines/MedicineTableActions'
import DispenseProductModal from '../components/medicines/DispenseProductModal'
import ReceiveProductModal from '../components/medicines/ReceiveProductModal'
import DeleteProductModal from '../components/medicines/DeleteProductModal'

import { useTableContext } from '../providers/TableProvider'

const PharmacistView = () => {
  const { isLoading, dispenseMedicine, receiveMedicine, deleteMedicine, clearSelected } = useTableContext()
  const [dispenseMedicineItem, setDispenseMedicineItem] = useState(null)
  const [receiveMedicineItem, setReceiveMedicineItem] = useState(null)
  const [deleteMedicineItem, setDeleteMedicineItem] = useState(null)

  const handleDispenseSubmit = async (data) => {
    await dispenseMedicine(dispenseMedicineItem?.sku, data)
    clearSelected()
  }

  const handleReceiveSubmit = async (data) => {
    await receiveMedicine(receiveMedicineItem?.sku, data)
    clearSelected()
  }

  const handleDeleteSubmit = async () => {
    await deleteMedicine(deleteMedicineItem?.sku)
    clearSelected()
  }

  return (
    <div className='pharmacist-view-wrapper'>
      <MedicineTableActions
        onDispense={setDispenseMedicineItem}
        onReceive={setReceiveMedicineItem}
        onDelete={setDeleteMedicineItem}
      />

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

      <DeleteProductModal
        isOpen={Boolean(deleteMedicineItem)}
        medicine={deleteMedicineItem}
        onClose={() => setDeleteMedicineItem(null)}
        onSubmit={handleDeleteSubmit}
      />
    </div>
  )
}

export default PharmacistView
