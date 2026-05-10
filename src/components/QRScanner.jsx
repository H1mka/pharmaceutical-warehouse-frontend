import { useState } from 'react'
import ScannerView from '../views/ScannerView'
import AddProductForm from './AddProductForm'
import './QRScanner.scss'

const QRScanner = () => {
  const [mode, setMode] = useState('idle')
  // idle | scanning | result | form

  const [product, setProduct] = useState(null)
  const [sku, setSku] = useState(null)

  const handleScanResult = async (decodedText) => {
    console.log('SCANNED:', decodedText)

    const res = await fetch('http://127.0.0.1:8000/api/qr-scan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        qr_data: decodedText, //  qrSku
      }),
    })

    const data = await res.json()
    console.log('BACKEND:', data)

    // ✅ найден или создан
    if (data.product) {
      setProduct(data.product)
      setMode('result')
      return
    }

    // только SKU форма
    if (data.needs_input) {
      setSku(data.sku) // 🔥 ВОТ ГЛАВНОЕ
      setProduct(data.data || {})
      setMode('form')
      return
    }
  }

  const handleCreated = (newProduct) => {
    setProduct(newProduct)
    setMode('result')
  }

  const handleRescan = () => {
    setProduct(null)
    setSku(null)
    setMode('scanning')
  }

  return (
    <div className='scanner-container'>
      <div>
        {mode === 'idle' && (
          <button onClick={() => setMode('scanning')} className='control-button'>
            Start scanning
          </button>
        )}

        {mode === 'scanning' && (
          <>
            <div className='scanner-view-video'>
              <ScannerView onScan={handleScanResult} />
            </div>

            <button onClick={() => setMode('idle')} className='control-button'>
              Cancel
            </button>
          </>
        )}

        {mode === 'result' && (
          <div className='result-card'>
            <div className='result-label'>Product</div>
            <div className='result-name'>{product?.name}</div>

            <button onClick={handleRescan} className='control-button'>
              Scan again
            </button>
          </div>
        )}

        {mode === 'form' && (
          <AddProductForm sku={sku} initialData={product} onCreated={handleCreated} onCancel={() => setMode('idle')} />
        )}
      </div>
    </div>
  )
}

export default QRScanner
