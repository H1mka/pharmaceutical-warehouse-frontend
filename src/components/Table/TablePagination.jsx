import { useMedicineTableContext } from './MedicineTableProvider'

const TablePagination = ({}) => {
  const { fetchAllMedicines, pagination } = useMedicineTableContext()
  const { page: currPage, total_pages = 0 } = pagination

  // Check if total pages is number, if not, set one page by default
  const buttons_pages = typeof total_pages === 'number' ? Array.from({ length: total_pages }, (_, i) => i + 1) : [1]

  const toNextPage = async (nextPage) => {
    if (typeof nextPage !== 'number') return

    await fetchAllMedicines({ page: nextPage })
  }

  return (
    <div className='table-pagination-wrapper flex justify-center'>
      <div className='join'>
        {buttons_pages.map((page) => {
          return (
            <button
              className={`join-item btn btn-md ${currPage === page && 'btn-active'}`}
              key={page}
              onClick={() => toNextPage(page)}
            >
              {page}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default TablePagination
