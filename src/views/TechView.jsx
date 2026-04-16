import { useState } from 'react'
import '../components/TechView.scss'

const TechView = () => {
  const [systemStatus, setSystemStatus] = useState({
    robotArm: 'Online',
    sensors: 'Active',
    temperature: '5°C',
    storageLoad: '72%',
  })

  const [logs, setLogs] = useState([
    '14:10 Robot moved to B2-04',
    '14:08 Medication retrieved',
    '14:05 System check completed',
  ])

  const addLog = (message) => {
    const time = new Date().toLocaleTimeString()
    setLogs((prev) => [`${time} ${message}`, ...prev])
  }

  const startRobot = () => {
    setSystemStatus((prev) => ({ ...prev, robotArm: 'Online' }))
    addLog('Robot arm started')
  }

  const stopRobot = () => {
    setSystemStatus((prev) => ({ ...prev, robotArm: 'Stopped' }))
    addLog('Robot arm stopped')
  }

  const resetSystem = () => {
    addLog('System restarted')
  }

  const runDiagnostics = () => {
    addLog('Diagnostics completed. All systems operational.')
  }

  return (
    <div className='repair-container'>
      <h1 className='repair-title'>Technician Dashboard</h1>

      <h2 className='section-title'>System Status</h2>
      <ul className='status-list'>
        <li>Robot Arm: {systemStatus.robotArm}</li>
        <li>Sensors: {systemStatus.sensors}</li>
        <li>Temperature: {systemStatus.temperature}</li>
        <li>Storage Load: {systemStatus.storageLoad}</li>
      </ul>

      <h2 className='section-title'>Equipment Control</h2>
      <div className='control-panel'>
        <button className='control-button' onClick={startRobot}>
          Start Robot
        </button>

        <button className='control-button' onClick={stopRobot}>
          Stop Robot
        </button>

        <button className='control-button' onClick={resetSystem}>
          Reset System
        </button>

        <button className='control-button' onClick={runDiagnostics}>
          Run Diagnostics
        </button>
      </div>

      <h2 className='section-title'>System Logs</h2>
      <ul className='logs-list'>
        {logs.map((log, index) => (
          <li key={index}>{log}</li>
        ))}
      </ul>
    </div>
  )
}

export default TechView
