import { createBrowserRouter } from 'react-router'
import { ROUTES } from '@/router/routes'
import MainView from '@/views/MainView'
import CustomerView from '../views/CustomerView'
import PharmacistView from '../views/PharmacistView'
import ControlPanel from '../views/ControlPanel'
import SettingsView from '../views/SettingsView'
import MainLayout from '@/layouts/MainLayout'
import Register from '../components/Register'

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: ROUTES.HOME, element: <MainView /> },
      { path: ROUTES.CUSTOMER, element: <CustomerView /> },
      { path: ROUTES.PHARMACIST, element: <PharmacistView /> },
      { path: ROUTES.CONTROL_PANEL, element: <ControlPanel /> },
      { path: ROUTES.SETTINGS, element: <SettingsView /> },
      { path: ROUTES.REGISTER, element: <Register /> },
    ],
  },
])

export { ROUTES }
export default router
