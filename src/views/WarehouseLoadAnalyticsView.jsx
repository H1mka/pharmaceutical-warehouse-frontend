import { useEffect, useMemo, useState } from 'react'
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Tooltip } from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { analyticsApi } from '../api'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

const RANGE_OPTIONS = [
  { label: 'Today', value: 'today' },
  { label: '7 days', value: '7d' },
  { label: '30 days', value: '30d' },
]

const HOUR_LABELS = Array.from({ length: 24 }, (_, hour) => `${String(hour).padStart(2, '0')}:00`)

const getRangeDates = (range) => {
  const end = new Date()
  const start = new Date(end)

  if (range === 'today') {
    start.setHours(0, 0, 0, 0)
    return { from: start.toISOString(), to: end.toISOString() }
  }

  const days = range === '30d' ? 30 : 7
  start.setDate(start.getDate() - days + 1)
  start.setHours(0, 0, 0, 0)

  return { from: start.toISOString(), to: end.toISOString() }
}

const buildHourlyLoad = (series = []) => {
  const hourBuckets = HOUR_LABELS.map((period) => ({
    period,
    quantity: 0,
    dispense_count: 0,
    duration_ms: 0,
  }))

  series.forEach((item) => {
    const date = new Date(item.period)
    if (Number.isNaN(date.getTime())) return

    const hour = date.getHours()
    hourBuckets[hour].quantity += Number(item.quantity || 0)
    hourBuckets[hour].dispense_count += Number(item.dispense_count || 0)
    hourBuckets[hour].duration_ms += Number(item.duration_ms || 0)
  })

  return hourBuckets
}

const formatDuration = (durationMs) => {
  if (!durationMs) return '0s'

  const seconds = Math.round(durationMs / 1000)
  const minutes = Math.floor(seconds / 60)
  const restSeconds = seconds % 60

  if (!minutes) return `${restSeconds}s`

  return `${minutes}m ${restSeconds}s`
}

const WarehouseLoadAnalyticsView = () => {
  const [range, setRange] = useState('7d')
  const [analytics, setAnalytics] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchAnalytics = async () => {
      setIsLoading(true)
      setError('')

      try {
        const { from, to } = getRangeDates(range)
        const response = await analyticsApi.getDispenseLoad({ granularity: 'hour', from, to })
        setAnalytics(response.data)
      } catch (fetchError) {
        const message = fetchError?.response?.data?.error || 'Failed to load analytics'
        setError(message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAnalytics()
  }, [range])

  const hourlyLoad = useMemo(() => buildHourlyLoad(analytics?.series?.total), [analytics])
  const peakHour = useMemo(() => {
    return hourlyLoad.reduce((peak, item) => (item.quantity > peak.quantity ? item : peak), hourlyLoad[0])
  }, [hourlyLoad])

  const chartData = useMemo(
    () => ({
      labels: hourlyLoad.map((item) => item.period),
      datasets: [
        {
          label: 'Dispensed quantity',
          data: hourlyLoad.map((item) => item.quantity),
          backgroundColor: '#22a6b3',
          borderColor: '#7ed6df',
          borderWidth: 1,
          borderRadius: 4,
          maxBarThickness: 34,
        },
        {
          label: 'Dispense operations',
          data: hourlyLoad.map((item) => item.dispense_count),
          backgroundColor: '#e74c3c',
          borderColor: '#ff7675',
          borderWidth: 1,
          borderRadius: 4,
          maxBarThickness: 34,
        },
      ],
    }),
    [hourlyLoad]
  )

  const chartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      plugins: {
        legend: {
          position: 'top',
          labels: {
            color: '#d1d5db',
            boxWidth: 14,
            boxHeight: 14,
          },
        },
        tooltip: {
          callbacks: {
            afterBody: (context) => {
              const index = context[0]?.dataIndex
              const item = hourlyLoad[index]
              if (!item) return ''

              return `Manipulator time: ${formatDuration(item.duration_ms)}`
            },
          },
        },
      },
      scales: {
        x: {
          grid: {
            color: 'rgba(148, 163, 184, 0.16)',
          },
          ticks: {
            color: '#cbd5e1',
            maxRotation: 0,
            autoSkip: false,
          },
        },
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(148, 163, 184, 0.16)',
          },
          ticks: {
            color: '#cbd5e1',
            precision: 0,
          },
        },
      },
    }),
    [hourlyLoad]
  )

  return (
    <div className='min-h-[calc(100vh-96px)] text-slate-100'>
      <div className='mb-5 flex flex-wrap items-end justify-between gap-4'>
        <div>
          <h1 className='text-2xl font-semibold'>Warehouse load by hour</h1>
          <p className='mt-1 text-sm text-slate-400'>Dispense activity grouped by hour of day</p>
        </div>

        <div className='join'>
          {RANGE_OPTIONS.map((option) => (
            <button
              key={option.value}
              type='button'
              className={`btn join-item btn-sm ${range === option.value ? 'btn-active bg-(--primary-blue)' : ''}`}
              onClick={() => setRange(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className='mb-4 grid gap-3 md:grid-cols-3'>
        <div className='rounded-md border border-slate-700 bg-slate-900/60 p-4'>
          <div className='text-sm text-slate-400'>Total quantity</div>
          <div className='mt-1 text-2xl font-semibold'>{analytics?.summary?.total_quantity ?? 0}</div>
        </div>

        <div className='rounded-md border border-slate-700 bg-slate-900/60 p-4'>
          <div className='text-sm text-slate-400'>Dispense operations</div>
          <div className='mt-1 text-2xl font-semibold'>{analytics?.summary?.dispense_count ?? 0}</div>
        </div>

        <div className='rounded-md border border-slate-700 bg-slate-900/60 p-4'>
          <div className='text-sm text-slate-400'>Peak hour</div>
          <div className='mt-1 text-2xl font-semibold'>{peakHour?.quantity ? peakHour.period : '-'}</div>
        </div>
      </div>

      <div className='rounded-md border border-slate-700 bg-slate-900/60 p-4'>
        {error && (
          <div className='mb-4 rounded-md border border-red-500/40 bg-red-950/40 p-3 text-sm text-red-200'>{error}</div>
        )}

        <div className='h-[460px]'>
          {isLoading ? (
            <div className='flex h-full items-center justify-center text-slate-400'>Loading analytics...</div>
          ) : (
            <Bar data={chartData} options={chartOptions} />
          )}
        </div>
      </div>
    </div>
  )
}

export default WarehouseLoadAnalyticsView
