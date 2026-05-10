import { useMedicineTableContext } from '../../providers/MedicineTableProvider'

const normalizeSelected = (selected) => {
  if (!selected) return []

  return Array.isArray(selected) ? selected : [selected]
}

const MedicineTableActions = ({ className = '', onDispense, onReceive, onDelete, onEdit }) => {
  const { selected } = useMedicineTableContext()

  const selectedItems = normalizeSelected(selected)
  const selectedItem = selectedItems[0]
  const isDisabled = selectedItems.length === 0

  const handleReceive = () => {
    if (isDisabled || typeof onReceive !== 'function') return

    onReceive(selectedItem, selectedItems)
  }

  const handleDelete = () => {
    if (isDisabled || typeof onDelete !== 'function') return

    onDelete(selectedItem, selectedItems)
  }

  const handleEdit = () => {
    if (isDisabled || typeof onEdit !== 'function') return

    onEdit(selectedItem, selectedItems)
  }

  const handleDispense = () => {
    if (isDisabled || typeof onDispense !== 'function') return

    onDispense(selectedItem)
  }

  return (
    <div className={`mb-4 flex flex-wrap items-center gap-2 ${className}`}>
      <button type='button' className='btn btn-success' disabled={isDisabled} onClick={handleDispense}>
        Dispense
      </button>

      <button
        type='button'
        className={`btn ${isDisabled ? '' : 'bg-(--primary-blue)'}`}
        disabled={isDisabled}
        onClick={handleReceive}
      >
        Receive
      </button>

      <button
        type='button'
        className={`btn ${isDisabled ? '' : 'bg-(--primary-red)'}`}
        disabled={isDisabled}
        onClick={handleDelete}
      >
        Delete
      </button>

      <button type='button' className='btn btn-outline' disabled={isDisabled} onClick={handleEdit}>
        Edit
      </button>

      <span className='text-sm text-gray-500'>
        {isDisabled ? 'No medicine selected' : `${selectedItems.length} selected`}
      </span>
    </div>
  )
}

export default MedicineTableActions
