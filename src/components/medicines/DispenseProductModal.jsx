import { useEffect, useState } from 'react'

const DispenseProductModal = ({ isOpen, medicine, onClose, onSubmit }) => {
  const [quantity, setQuantity] = useState(1)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!isOpen) return

    setQuantity(1)
    setError('')
  }, [isOpen, medicine?.sku])

  if (!isOpen) return null

  const handleSubmit = async (event) => {
    event.preventDefault()

    const parsedQuantity = Number(quantity)

    if (!Number.isInteger(parsedQuantity) || parsedQuantity <= 0) {
      setError('Quantity must be a positive integer')
      return
    }

    try {
      setIsSubmitting(true)
      setError('')

      await onSubmit({ quantity: parsedQuantity })
      onClose()
    } catch (submitError) {
      const message = submitError?.response?.data?.error || 'Failed to dispense product'
      setError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <dialog className='modal modal-open'>
      <div className='modal-box max-w-md'>
        <h3 className='text-lg font-semibold'>Dispense product</h3>

        <div className='mt-3 text-sm text-gray-600'>
          <div>{medicine?.name}</div>
          <div className='mt-1'>SKU: {medicine?.sku}</div>
        </div>

        <form className='mt-5' onSubmit={handleSubmit}>
          <label className='form-control w-full'>
            <span className='label-text mb-2'>Quantity</span>
            <input
              className='input input-bordered w-full'
              min='1'
              step='1'
              type='number'
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
            />
          </label>

          {error && <div className='mt-3 text-sm text-red-600'>{error}</div>}

          <div className='modal-action'>
            <button type='button' className='btn btn-ghost' disabled={isSubmitting} onClick={onClose}>
              Cancel
            </button>

            <button type='submit' className='btn btn-success' disabled={isSubmitting}>
              {isSubmitting ? 'Dispensing...' : 'Dispense'}
            </button>
          </div>
        </form>
      </div>

      <form method='dialog' className='modal-backdrop'>
        <button type='button' onClick={onClose}>
          close
        </button>
      </form>
    </dialog>
  )
}

export default DispenseProductModal
