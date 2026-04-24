import { ROUTES } from '@/router'
import { NavLink } from 'react-router'
import { useState, useEffect } from 'react'

const Drawer = () => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user')
    return storedUser ? JSON.parse(storedUser) : null
  })

  useEffect(() => {
    const handleUserUpdated = () => {
      const storedUser = localStorage.getItem('user')
      setUser(storedUser ? JSON.parse(storedUser) : null)
    }

    window.addEventListener('userUpdated', handleUserUpdated)
    return () => window.removeEventListener('userUpdated', handleUserUpdated)
  }, [])

  return (
    <div className='drawer-side is-drawer-close:overflow-visible'>
      <label htmlFor='my-drawer-4' aria-label='close sidebar' className='drawer-overlay'></label>
      <div className='flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64'>
        {/* <!-- Sidebar content here --> */}
        <ul className='menu w-full grow'>
          {/* <!-- List item --> */}
          <li>
            <NavLink to={ROUTES.HOME} className='is-drawer-close:hidden'>
              <button className='is-drawer-close:tooltip is-drawer-close:tooltip-right' data-tip='Homepage'>
                {/* <!-- Home icon --> */}
                Homepage
              </button>
            </NavLink>
          </li>

          {/* Показывать Settings только для admin */}
          {user && user.role === 'admin' && (
            <li>
              <NavLink to={ROUTES.SETTINGS} className='is-drawer-close:hidden'>
                <button className='is-drawer-close:tooltip is-drawer-close:tooltip-right' data-tip='Settings'>
                  {/* <!-- Settings icon --> */}
                  Settings
                  <span className='is-drawer-close:hidden'></span>
                </button>
              </NavLink>
            </li>
          )}

          {/* Показывать Repair только для admin */}
          {user && user.role === 'admin' && (
            <li>
              <NavLink to={ROUTES.REPAIR} className='is-drawer-close:hidden'>
                <button className='is-drawer-close:tooltip is-drawer-close:tooltip-right' data-tip='Repair page'>
                  {/* <!-- Repair icon --> */}
                  Repair
                </button>
              </NavLink>
            </li>
          )}

          {/* Показывать Pharmacist только для pharmacist */}
          {user && user.role === 'pharmacist' && (
            <li>
              <NavLink to={ROUTES.PHARMACIST} className='is-drawer-close:hidden'>
                <button className='is-drawer-close:tooltip is-drawer-close:tooltip-right' data-tip='Pharmacist page'>
                  {/* <!-- Pharmacist icon --> */}
                  Pharmacist
                </button>
              </NavLink>
            </li>
          )}

          {/* Показывать Customer только для customer */}
          {user && user.role === 'customer' && (
            <li>
              <NavLink to={ROUTES.CUSTOMER} className='is-drawer-close:hidden'>
                <button className='is-drawer-close:tooltip is-drawer-close:tooltip-right' data-tip='Customer page'>
                  {/* <!-- Customer icon --> */}
                  Customer
                </button>
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Drawer
