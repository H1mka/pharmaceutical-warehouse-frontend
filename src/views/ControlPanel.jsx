import { useState, useEffect } from "react";
import mqtt from "mqtt";
import '../components/ControlPanel.scss'
import { useTableContext } from '../providers/TableProvider'
import { manipulatorApi } from '../api'
import Table from '../components/Table/Table'
import TablePagination from '../components/Table/TablePagination'

const ControlPanel = () => {
  const [systemStatus, setSystemStatus] = useState({
    manipulatorState: 'Unknown',
    manipulatorLoc: 'Unknown',
    currentOperation: 'Unknown'
  })

  const { fetchAllLogs, logs, setLogs, pagination, isLoading } = useTableContext();

  useEffect(() => {
    // 1. Initial status fetch
    manipulatorApi.getState()
      .then((res) => {
        setSystemStatus(prev => ({
          ...prev,
          manipulatorState: res.data.status || 'Unknown',
          manipulatorLoc: res.data.position || 'Unknown'
        }));
      })
      .catch((err) => console.error("Помилка при завантаженні статусу маніпулятора:", err));

    // 2. Setup MQTT Connection via WebSockets
    const client = mqtt.connect("ws://broker.hivemq.com:8000/mqtt");

    client.on("connect", () => {
      console.log("Connected to MQTT broker via WebSockets");
      client.subscribe("pharmaceutical_warehouse/manipulator_state");
      client.subscribe("pharmaceutical_warehouse/manipulator_logs");
    });

    client.on("message", (topic, message) => {
      if (topic === "pharmaceutical_warehouse/manipulator_state") {
        try {
          const payload = JSON.parse(message.toString());
          console.log("Received MQTT payload:", payload);

          setSystemStatus((prev) => ({
            manipulatorState: payload.status || prev.manipulatorState,
            manipulatorLoc: payload.position || prev.manipulatorLoc,
            currentOperation: payload.current_operation || prev.currentOperation
          }));
        } catch (e) {
          console.error("Failed to parse MQTT state message", e);
        }
      } else if (topic === "pharmaceutical_warehouse/manipulator_logs") {
        try {
          const newLog = JSON.parse(message.toString());
          console.log("Received new log via MQTT:", newLog);
          setLogs(prevLogs => {
            // Keep maximum of 10 items in the table to match initial fetch limit
            const updatedLogs = [newLog, ...prevLogs];
            return updatedLogs.slice(0, 10);
          });
        } catch (e) {
          console.error("Failed to parse MQTT log message", e);
        }
      }
    });

    return () => {
      client.end();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startRobot = () => {
    manipulatorApi.createLog({ operation_type: "START" }).then(() => {
      console.log("Start command sent");
    }).catch((err) => console.error(err));
  }

  const stopRobot = () => {
    manipulatorApi.createLog({ operation_type: "STOP" }).then(() => {
      console.log("Stop command sent");
    }).catch((err) => console.error(err));
  }

  const tableData = logs.map((log) => ({
    id: log.id,
    Time: (() => { const d = new Date(log.timestamp); return `${d.toLocaleString('uk-UA', { dateStyle: 'short', timeStyle: 'medium' })}.${String(d.getMilliseconds()).padStart(3, '0')}`; })(),
    Action: log.operation_type,
    Status: log.operation_status,
    'Loc ID': log.storage_location || '-',
    'Prod ID': log.product || '-',
    Qty: log.product_quantity || '-',
  }))

  const tableHeaders = [
    // { title: 'Id', value: 'id' },
    { title: 'Time', value: 'Time' },
    { title: 'Action', value: 'Action' },
    { title: 'Status', value: 'Status' },
    { title: 'Location', value: 'Loc ID' },
    { title: 'Product', value: 'Prod ID' },
    { title: 'Qty', value: 'Qty' },
  ]

  return (
    <div className='control-panel-container'>
      <h1 className='control-panel-title'>Technician Dashboard</h1>

      <h2 className='section-title'>System Status</h2>
      <ul className='status-list'>
        <li>Manipulator state: <strong>{systemStatus.manipulatorState}</strong></li>
        <li>Manipulator location: <strong>{systemStatus.manipulatorLoc}</strong></li>
        <li>Current operation: <strong>{systemStatus.currentOperation}</strong></li>
      </ul>

      <h2 className='section-title'>Control Panel</h2>
      <div className='control-panel-buttons'>
        <button className='state-button' onClick={startRobot} disabled={systemStatus.manipulatorState === 'ON'}>
          Start Robot
        </button>

        <button className='state-button' onClick={stopRobot} disabled={systemStatus.manipulatorState === 'OFF'}>
          Stop Robot
        </button>
      </div>

      <h2 className='section-title'>System Logs</h2>
      {isLoading ? (
        <p>Loading logs...</p>
      ) : (
        <>
          {tableData.length > 0 ? (
            <Table externalData={tableData} externalHeaders={tableHeaders} />
          ) : (
            <p>No logs found.</p>
          )}
          {pagination.total_pages > 1 && <TablePagination pagination={pagination} fetchData={fetchAllLogs} />}
        </>
      )}
    </div>
  )
}

export default ControlPanel
