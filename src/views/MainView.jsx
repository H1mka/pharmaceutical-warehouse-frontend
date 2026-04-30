import Table from '../components/Table/Table'
import TablePagination from '../components/Table/TablePagination'
import TableNameSearch from '../components/Table/TableNameSearch'
import Loader from '../components/Loader'

import { useMedicines } from '../hooks'

const PharmacistView = () => {
  const { medicines, pagination, isLoading, fetchAllMedicines } = useMedicines()

  return (
    <div>
      <Loader isLoading={isLoading} />

      <TableNameSearch className={'mb-4'} fetchData={fetchAllMedicines} />

      <Table className={'mb-4'} data={medicines} />

      <TablePagination pagination={pagination} fetchData={fetchAllMedicines} />
    </div>
  )
}

export default PharmacistView
