import { Outlet } from 'react-router'
import Header from '@/components/Header'
import Drawer from '@/components/Drawer'

const MainLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content">
        <Header />

        <main className="p-4">
          <Outlet />
        </main>
      </div>

      <Drawer />
    </div>
  )
}

export default MainLayout
