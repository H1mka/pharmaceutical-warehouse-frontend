import mqtt from 'mqtt'

const MQTT_URL = import.meta.env.VITE_MQTT_URL || 'ws://localhost:9001'
const PRODUCT_UPDATES_TOPIC = import.meta.env.VITE_MQTT_PRODUCT_UPDATES_TOPIC || 'pharma/products/updates'

export const subscribeToProductUpdates = ({ onMessage, onStatusChange } = {}) => {
  const client = mqtt.connect(MQTT_URL, {
    clientId: `pharma-web-${Math.random().toString(16).slice(2)}`,
    clean: true,
    reconnectPeriod: 3000,
    connectTimeout: 5000,
  })

  client.on('connect', () => {
    onStatusChange?.('connected')
    client.subscribe(PRODUCT_UPDATES_TOPIC, (error) => {
      if (error) {
        onStatusChange?.('error')
        console.error('MQTT subscribe error:', error)
      }
    })
  })

  client.on('reconnect', () => onStatusChange?.('reconnecting'))
  client.on('offline', () => onStatusChange?.('offline'))
  client.on('error', (error) => {
    onStatusChange?.('error')
    console.error('MQTT connection error:', error)
  })

  client.on('message', (_, message) => {
    try {
      onMessage?.(JSON.parse(message.toString()))
    } catch (error) {
      console.error('MQTT message parse error:', error)
    }
  })

  return () => client.end(true)
}

export { PRODUCT_UPDATES_TOPIC }
