import { useEffect, useRef } from 'react'
import { Html5Qrcode } from 'html5-qrcode'

const ScannerView = ({ onScan }) => {
  const scannerRef = useRef(null)
  const isStarted = useRef(false)

  useEffect(() => {
    // ❗ если уже был создан — не создаём второй
    if (scannerRef.current) return

    const scanner = new Html5Qrcode('reader')
    scannerRef.current = scanner

    scanner
      .start({ facingMode: 'environment' }, { fps: 10, qrbox: 250 }, async (decodedText) => {
        console.log('QR:', decodedText)

        try {
          await scanner.stop()
        } catch {}

        onScan(decodedText)
      })
      .then(() => {
        isStarted.current = true
        console.log('🎥 STARTED')
      })
      .catch((err) => console.error(err))

    return () => {
      if (isStarted.current && scannerRef.current) {
        scannerRef.current.stop().catch(() => {})
        scannerRef.current = null
        isStarted.current = false
        console.log('🛑 STOPPED')
      }
    }
  }, [])

  return <div id='reader' style={{ width: 300 }} />
}

export default ScannerView
