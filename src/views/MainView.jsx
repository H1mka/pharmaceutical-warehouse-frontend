import Table from '../components/Table/Table'
import TablePagination from '../components/Table/TablePagination'
import TableNameSearch from '../components/Table/TableNameSearch'
import Loader from '../components/Loader'
import { useMedicineTableContext } from '../components/Table/MedicineTableProvider'

import { useMedicines } from '../hooks'

const PharmacistView = () => {
  const headers = [
    { title: 'Sku', value: 'sku' },
    { title: 'Name', value: 'name' },
    { title: 'Manufacturer', value: 'manufacturer' },
    { title: 'Form', value: 'form' },
    { title: 'Package size', value: 'package_size' },
    { title: 'Expiration date', value: 'expiration_date' },
  ]

  const { isLoading } = useMedicineTableContext()

  return (
    <div>
      <Loader isLoading={isLoading} />

      <TableNameSearch className={'mb-4'} />

      <Table className={'mb-4'} externalHeaders={headers} />

      <TablePagination />
    </div>
  )
}

export default PharmacistView
