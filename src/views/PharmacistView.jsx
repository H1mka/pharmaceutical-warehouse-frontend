import Table from '../components/Table/Table'
import TablePagination from '../components/Table/TablePagination'
import TableNameSearch from '../components/Table/TableNameSearch'
import Loader from '../components/Loader'
import QRScanner from '../components/QRScanner'

import { useMedicineTableContext } from '../components/Table/MedicineTableProvider'

const PharmacistView = () => {
  const { isLoading } = useMedicineTableContext()

  return (
    <div className='pharmacist-view-wrapper'>
      <TableNameSearch className={'mb-4'} />

      <Table className={'mb-4'} />

      <TablePagination />

      <Loader isLoading={isLoading} />
    </div>
  )
}

export default PharmacistView
