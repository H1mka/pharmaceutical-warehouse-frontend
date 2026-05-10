import { createBrowserRouter } from 'react-router'
import { ROUTES } from '@/router/routes'
import MainView from '@/views/MainView'
import PharmacistView from '../views/PharmacistView'
import ControlPanel from '../views/ControlPanel'
import SettingsView from '../views/SettingsView'
import MainLayout from '@/layouts/MainLayout'
import Register from '../components/Register'
import Authorisation from '../components/Authorisation'
import ProtectedRoute from '../components/ProtectedRoute'
import WarehouseLoadAnalyticsView from '../views/WarehouseLoadAnalyticsView'
import MedicinePopularityView from '../views/MedicinePopularityView'
import { MedicineTableProvider } from '../providers/MedicineTableProvider'

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: ROUTES.HOME,
        element: <MainView />,
      },
      {
        path: ROUTES.PHARMACIST,
        element: (
          <ProtectedRoute allowedRoles={['pharmacist']}>
            <MedicineTableProvider isSingleSelect>
              <PharmacistView />
            </MedicineTableProvider>
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.WAREHOUSE_LOAD,
        element: (
          <ProtectedRoute allowedRoles={['admin', 'pharmacist']}>
            <WarehouseLoadAnalyticsView />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.MEDICINE_POPULARITY,
        element: (
          <ProtectedRoute allowedRoles={['admin', 'pharmacist']}>
            <MedicinePopularityView />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.CONTROL_PANEL,
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <ControlPanel />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.SETTINGS,
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <SettingsView />
          </ProtectedRoute>
        ),
      },

      { path: ROUTES.REGISTER, element: <Register /> },
      { path: ROUTES.AUTHORISATION, element: <Authorisation /> },
    ],
  },
])

// export { ROUTES };
export default router
