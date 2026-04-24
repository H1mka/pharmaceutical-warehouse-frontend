import { useState, useEffect } from "react";
import "../components/ControlPanel.scss";
import { useManipulator } from "../hooks";
import { manipulatorApi } from "../api";
import Table from "../components/Table";
import TablePagination from "../components/TablePagination";

const ControlPanel = () => {
  const [systemStatus, setSystemStatus] = useState({
    manipulatorState: 'Unknown',
    manipulatorLoc: 'Unknown'
  })

  const { fetchAllLogs, logs, pagination, isLoading } = useManipulator();

  useEffect(() => {
    manipulatorApi.getState()
      .then((res) => {
        setSystemStatus({
          manipulatorState: res.data.status || 'Unknown',
          manipulatorLoc: res.data.position || 'Unknown'
        });
      })
      .catch((err) => console.error("Помилка при завантаженні статусу маніпулятора:", err));
  }, []);

  const startRobot = () => {
    manipulatorApi.updateState("ON").then(res => {
      setSystemStatus(prev => ({ ...prev, manipulatorState: res.data.status }));
      fetchAllLogs();
    }).catch((err) => console.error(err));
  }

  const stopRobot = () => {
    manipulatorApi.updateState("OFF").then(res => {
      setSystemStatus(prev => ({ ...prev, manipulatorState: res.data.status }));
      fetchAllLogs();
    }).catch((err) => console.error(err));
  }

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
    <div className='control-panel-container'>
      <h1 className='control-panel-title'>Technician Dashboard</h1>

      <h2 className='section-title'>System Status</h2>
      <ul className='status-list'>
        <li>Manipulator state: {systemStatus.manipulatorState}</li>
        <li>Manipulator location: {systemStatus.manipulatorLoc}</li>
      </ul>

      <h2 className="section-title">Control Panel</h2>
      <div className="control-panel-buttons">
        <button
          className="state-button"
          onClick={startRobot}
          disabled={systemStatus.manipulatorState === 'ON'}>
          Start Robot
        </button>

        <button
          className='state-button'
          onClick={stopRobot}
          disabled={systemStatus.manipulatorState === 'OFF'}>
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
          {pagination.total_pages > 1 && (
            <TablePagination pagination={pagination} fetchData={fetchAllLogs} />
          )}
        </>
      )}
    </div>
  )
}

export default ControlPanel;
