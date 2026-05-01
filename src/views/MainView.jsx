import QRScanner from '../components/QRScanner'

import './MainView.scss'

const MainView = () => {
  return (
    <div className='main-view-wrapper'>
      <div className='main-header'>
        <h1 className='main-title'>Dashboard</h1>
        <p className='main-subtitle'>Manage your warehouse and scan medications</p>
      </div>

      <div className='card-actions-wrapper'>
        <div className='scanner-card'>
          <h3 className='scanner-card-title'>📦 QR Scanner</h3>
          <p className='scanner-card-subtitle mb-2'>Scan medication QR codes to find or add products</p>

          <QRScanner />
        </div>
      </div>
    </div>
  )
}

export default MainView
