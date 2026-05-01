import QRScanner from '../components/QRScanner'
import './MainView.scss'

const MainView = () => {
  return (
    <div className='main-container'>
      <div className='main-header'>
        <h1 className='main-title'>Dashboard</h1>
        <p className='main-subtitle'>Manage your warehouse and scan medications</p>
      </div>

      <div className='main-grid'>
        <div className='card'>
          <h3 className='card-title'>📦 QR Scanner</h3>
          <p className='card-subtitle'>Scan medication QR codes to find or add products</p>

          <QRScanner />
        </div>
      </div>
    </div>
  )
}

export default MainView
