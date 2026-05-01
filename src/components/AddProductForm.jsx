import { useState } from 'react'
import './AddProductForm.scss'

const AddProductForm = ({ sku, onCreated, initialData = {}, onCancel }) => {
  const safeData = initialData || {}
  const safe = (val) => val ?? ''

  const [name, setName] = useState(safe(safeData.name))
  const [manufacturer, setManufacturer] = useState(safe(safeData.manufacturer))
  const [form, setForm] = useState(safe(safeData.form))
  const [dosage, setDosage] = useState(safe(safeData.dosage))
  const [packageSize, setPackageSize] = useState(safe(safeData.package_size))
  const [expirationDate, setExpirationDate] = useState(safe(safeData.expiration_date).slice(0, 16))
  const [loading, setLoading] = useState(false)

  const isValid = name && manufacturer && form && dosage && packageSize

  const handleSubmit = async () => {
    if (!isValid) return

    setLoading(true)

    try {
      console.log('FORM SKU:', sku)

      const res = await fetch('http://127.0.0.1:8000/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sku: sku,
          name,
          manufacturer,
          form,
          dosage,
          package_size: Number(packageSize),
          expiration_date: expirationDate || null,
          quantity: 10,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        console.error('❌ ERROR:', data)
        return
      }
      if (!sku) {
        console.error('❌ SKU is missing')
        return
      }
      console.log('✅ CREATED:', data)
      onCreated(data)
    } catch (err) {
      console.error('❌ NETWORK ERROR:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='form-container'>
      <h3 className='form-title'>Add product</h3>

      <input className='form-input sku-field' value={sku || ''} readOnly />

      <input className='form-input' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />

      <input
        className='form-input'
        placeholder='Manufacturer'
        value={manufacturer}
        onChange={(e) => setManufacturer(e.target.value)}
      />

      <input
        className='form-input'
        placeholder='Form (Tablet, Capsule...)'
        value={form}
        onChange={(e) => setForm(e.target.value)}
      />

      <input
        className='form-input'
        placeholder='Dosage (500 mg)'
        value={dosage}
        onChange={(e) => setDosage(e.target.value)}
      />

      <input
        className='form-input'
        type='number'
        placeholder='Package size'
        value={packageSize}
        onChange={(e) => setPackageSize(e.target.value)}
      />

      <input
        className='form-input'
        type='datetime-local'
        value={expirationDate}
        onChange={(e) => setExpirationDate(e.target.value)}
      />

      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={handleSubmit}
          disabled={!isValid || loading}
          className={`form-button ${isValid ? 'enabled' : 'disabled'}`}
        >
          {loading ? 'Saving...' : 'Save'}
        </button>

        <button onClick={onCancel} className='form-button cancel'>
          Cancel
        </button>
      </div>
    </div>
  )
}

export default AddProductForm
