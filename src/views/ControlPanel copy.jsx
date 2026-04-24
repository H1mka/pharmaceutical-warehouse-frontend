import { useState, useEffect } from "react";
import "../components/ControlPanel.scss";
import { useManipulator } from "../hooks";
import Table from "../components/Table";
import TablePagination from "../components/TablePagination";

const ControlPanel = () => {
  const [systemStatus, setSystemStatus] = useState({
    manipulatorState: 'Unknown',
    manipulatorLoc: 'Unknown'
  })

  const { fetchAllLogs, logs, pagination, isLoading } = useManipulator();

  useEffect(() => {
    // Fetch manipulator status on load
    fetch("http://127.0.0.1:8000/control-panel/manipulator-state")
      .then((res) => res.json())
      .then((data) => {
        setSystemStatus({
          manipulatorState: data.status || 'Unknown',
          manipulatorLoc: data.position || 'Unknown'
        });
      })
      .catch((err) => console.error("Ошибка при загрузке статуса:", err));
  }, []);

  const startRobot = () => {
    fetch("http://127.0.0.1:8000/control-panel/manipulator-state", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "ON" })
    })
      .then(res => res.json())
      .then(data => {
        setSystemStatus(prev => ({ ...prev, manipulatorState: data.status }));
        fetchAllLogs(); 
      })
      .catch((err) => console.error(err));
  }

  const stopRobot = () => {
    fetch("http://127.0.0.1:8000/control-panel/manipulator-state", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "OFF" })
    })
      .then(res => res.json())
      .then(data => {
        setSystemStatus(prev => ({ ...prev, manipulatorState: data.status }));
        fetchAllLogs();
      })
      .catch((err) => console.error(err));
  }

  // Format logs for Table component
  const tableData = logs.map((log) => ({
    id: log.id,
    Time: new Date(log.timestamp).toLocaleTimeString(),
    Action: log.operation_type,
    Status: log.operation_status,
    "Loc ID": log.storage_location || "-",
    "Prod ID": log.product || "-",
    Qty: log.product_quantity || "-"
  }));

  return (
    <div className='repair-container'>
      <h1 className='repair-title'>Technician Dashboard</h1>

      <h2 className='section-title'>System Status</h2>
      <ul className='status-list'>
        <li>Robot Arm: {systemStatus.manipulatorState}</li>
        <li>Current Location: {systemStatus.manipulatorLoc}</li>
      </ul>

      <h2 className="section-title">Control Panel</h2>
      <div className="control-panel">
        <button 
          className="control-button" 
          onClick={startRobot} 
          disabled={systemStatus.manipulatorState === 'ON'}
        >
          Start Robot
        </button>

        <button 
          className='control-button' 
          onClick={stopRobot} 
          disabled={systemStatus.manipulatorState === 'OFF'}
        >
          Stop Robot
        </button>
      </div>

      <h2 className='section-title'>System Logs</h2>
      {isLoading ? (
        <p>Loading logs...</p>
      ) : (
        <>
          {tableData.length > 0 ? (
            <Table data={tableData} />
          ) : (
            <p>No logs found.</p>
          )}
          <TablePagination pagination={pagination} fetchData={fetchAllLogs} />
        </>
      )}
    </div>
  )
}

export default ControlPanel;
