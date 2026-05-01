import Table from '../components/Table/Table'
import TablePagination from '../components/Table/TablePagination'
import TableNameSearch from '../components/Table/TableNameSearch'
import Loader from '../components/Loader'

import { useMedicineTableContext } from '../components/Table/MedicineTableProvider'

const PharmacistView = () => {
  const { isLoading } = useMedicineTableContext()

  return (
    <div>
      <Loader isLoading={isLoading} />

      <TableNameSearch className={'mb-4'} />

      <Table className={'mb-4'} />

      <TablePagination />
    </div>
  )
}

export default PharmacistView
