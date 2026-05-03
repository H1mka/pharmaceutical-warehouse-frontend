import { useEffect, useMemo, useState } from 'react'
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Tooltip } from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { analyticsApi } from '../api'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

const RANGE_OPTIONS = [
  { label: 'Today', value: 'today' },
  { label: '7 days', value: '7d' },
  { label: '30 days', value: '30d' },
  { label: 'All time', value: 'all' },
]

const LIMIT_OPTIONS = [5, 10, 15]

const SORT_OPTIONS = [
  { label: 'By quantity', value: 'quantity' },
  { label: 'By operations', value: 'count' },
]

const getRangeDates = (range) => {
  if (range === 'all') return {}

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

const formatNumber = (value) => new Intl.NumberFormat('en-US').format(Number(value || 0))

const MedicinePopularityView = () => {
  const [range, setRange] = useState('30d')
  const [limit, setLimit] = useState(10)
  const [sortBy, setSortBy] = useState('quantity')
  const [analytics, setAnalytics] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchAnalytics = async () => {
      setIsLoading(true)
      setError('')

      try {
        const rangeDates = getRangeDates(range)
        const response = await analyticsApi.getProductPopularity({
          ...rangeDates,
          limit,
          sort_by: sortBy,
        })

        setAnalytics(response.data)
      } catch (fetchError) {
        const message = fetchError?.response?.data?.error || 'Failed to load medicine popularity'
        setError(message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAnalytics()
  }, [range, limit, sortBy])

  const items = analytics?.items || []
  const topProduct = analytics?.summary?.top_product

  const chartData = useMemo(
    () => ({
      labels: analytics?.chart?.labels || [],
      datasets: [
        {
          label: 'Dispensed quantity',
          data: analytics?.chart?.datasets?.[0]?.data || [],
          backgroundColor: '#22a6b3',
          borderColor: '#7ed6df',
          borderWidth: 1,
          borderRadius: 4,
          maxBarThickness: 48,
        },
        {
          label: 'Dispense operations',
          data: analytics?.chart?.datasets?.[1]?.data || [],
          backgroundColor: '#f59e0b',
          borderColor: '#fbbf24',
          borderWidth: 1,
          borderRadius: 4,
          maxBarThickness: 48,
        },
      ],
    }),
    [analytics]
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
              const item = items[index]
              if (!item) return ''

              return [
                `SKU: ${item.sku}`,
                `Quantity share: ${item.quantity_share_percent}%`,
                `Operation share: ${item.count_share_percent}%`,
              ]
            },
          },
        },
      },
      scales: {
        x: {
          grid: {
            color: 'rgba(148, 163, 184, 0.14)',
          },
          ticks: {
            color: '#cbd5e1',
            maxRotation: 45,
            minRotation: 0,
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
    [items]
  )

  return (
    <div className='min-h-[calc(100vh-96px)] text-slate-100'>
      <div className='mb-5 flex flex-wrap items-end justify-between gap-4'>
        <div>
          <h1 className='text-2xl font-semibold'>Medicine popularity</h1>
          <p className='mt-1 text-sm text-slate-400'>Most dispensed products by quantity and operations</p>
        </div>

        <div className='flex flex-wrap items-center gap-3'>
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

          <select
            className='select select-sm w-36 border-slate-700 bg-slate-900 text-slate-100'
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <select
            className='select select-sm w-24 border-slate-700 bg-slate-900 text-slate-100'
            value={limit}
            onChange={(event) => setLimit(Number(event.target.value))}
          >
            {LIMIT_OPTIONS.map((option) => (
              <option key={option} value={option}>
                Top {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className='mb-4 grid gap-3 md:grid-cols-4'>
        <div className='rounded-md border border-slate-700 bg-slate-900/60 p-4'>
          <div className='text-sm text-slate-400'>Total dispensed</div>
          <div className='mt-1 text-2xl font-semibold'>
            {formatNumber(analytics?.summary?.total_dispensed_quantity)}
          </div>
        </div>

        <div className='rounded-md border border-slate-700 bg-slate-900/60 p-4'>
          <div className='text-sm text-slate-400'>Dispense operations</div>
          <div className='mt-1 text-2xl font-semibold'>{formatNumber(analytics?.summary?.dispense_count)}</div>
        </div>

        <div className='rounded-md border border-slate-700 bg-slate-900/60 p-4'>
          <div className='text-sm text-slate-400'>Products in analytics</div>
          <div className='mt-1 text-2xl font-semibold'>{formatNumber(analytics?.summary?.products_count)}</div>
        </div>

        <div className='rounded-md border border-slate-700 bg-slate-900/60 p-4'>
          <div className='text-sm text-slate-400'>Top medicine</div>
          <div className='mt-1 truncate text-2xl font-semibold' title={topProduct?.name || ''}>
            {topProduct?.name || '-'}
          </div>
        </div>
      </div>

      <div className='grid gap-4 xl:grid-cols-[minmax(0,1fr)_420px]'>
        <div className='rounded-md border border-slate-700 bg-slate-900/60 p-4'>
          {error && (
            <div className='mb-4 rounded-md border border-red-500/40 bg-red-950/40 p-3 text-sm text-red-200'>
              {error}
            </div>
          )}

          <div className='h-[480px]'>
            {isLoading ? (
              <div className='flex h-full items-center justify-center text-slate-400'>Loading analytics...</div>
            ) : items.length ? (
              <Bar data={chartData} options={chartOptions} />
            ) : (
              <div className='flex h-full items-center justify-center text-slate-400'>No dispense data for this period</div>
            )}
          </div>
        </div>

        <div className='rounded-md border border-slate-700 bg-slate-900/60'>
          <div className='border-b border-slate-700 px-4 py-3'>
            <h2 className='text-base font-semibold'>Ranking</h2>
          </div>

          <div className='max-h-[512px] overflow-auto'>
            <table className='table table-sm'>
              <thead className='sticky top-0 z-10 bg-slate-900 text-slate-300'>
                <tr>
                  <th className='w-12'>#</th>
                  <th>Medicine</th>
                  <th className='text-right'>Qty</th>
                  <th className='text-right'>Ops</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.product_id} className='border-slate-800'>
                    <td className='font-medium text-slate-300'>{item.rank}</td>
                    <td>
                      <div className='max-w-48 truncate font-medium text-slate-100' title={item.name}>
                        {item.name}
                      </div>
                      <div className='text-xs text-slate-500'>{item.sku}</div>
                    </td>
                    <td className='text-right font-medium'>{formatNumber(item.dispensed_quantity)}</td>
                    <td className='text-right text-slate-300'>{formatNumber(item.dispense_count)}</td>
                  </tr>
                ))}

                {!isLoading && !items.length && (
                  <tr>
                    <td colSpan='4' className='py-10 text-center text-slate-400'>
                      No data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MedicinePopularityView
