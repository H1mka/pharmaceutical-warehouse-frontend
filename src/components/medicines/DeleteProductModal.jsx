import { useState } from 'react'

const DeleteProductModal = ({ isOpen, medicine, onClose, onSubmit }) => {
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleClose = () => {
    setError('')
    onClose()
  }

  if (!isOpen) return null

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      setIsSubmitting(true)
      setError('')

      await onSubmit()
      handleClose()
    } catch (submitError) {
      const message = submitError?.response?.data?.error || 'Failed to delete product'
      setError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <dialog className='modal modal-open'>
      <div className='modal-box max-w-md'>
        <h3 className='text-lg font-semibold'>Delete product</h3>

        <div className='mt-3 text-sm text-gray-600'>
          <div>{medicine?.name}</div>
          <div className='mt-1'>SKU: {medicine?.sku}</div>
          <div className='mt-3 text-red-600'>This action cannot be undone.</div>
        </div>

        <form className='mt-5' onSubmit={handleSubmit}>
          {error && <div className='mb-3 text-sm text-red-600'>{error}</div>}

          <div className='modal-action'>
            <button type='button' className='btn btn-ghost' disabled={isSubmitting} onClick={handleClose}>
              Cancel
            </button>

            <button type='submit' className='btn bg-(--primary-red)' disabled={isSubmitting}>
              {isSubmitting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </form>
      </div>

      <form method='dialog' className='modal-backdrop'>
        <button type='button' onClick={handleClose}>
          close
        </button>
      </form>
    </dialog>
  )
}

export default DeleteProductModal
