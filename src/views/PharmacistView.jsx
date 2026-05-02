import Table from '../components/table/Table'
import TablePagination from '../components/table/TablePagination'
import TableNameSearch from '../components/table/TableNameSearch'
import Loader from '../components/Loader'
import QRScanner from '../components/QRScanner'

import { useMedicineTableContext } from '../providers/MedicineTableProvider'

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
