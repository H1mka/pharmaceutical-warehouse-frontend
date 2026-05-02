import { createBrowserRouter } from 'react-router'
import { ROUTES } from '@/router/routes'
import MainView from '@/views/MainView'
import PharmacistView from '../views/PharmacistView'
import RepairView from '../views/RepairView'
import SettingsView from '../views/SettingsView'
import MainLayout from '@/layouts/MainLayout'
import Register from '../components/Register'
import Authorisation from '../components/Authorisation'
import ProtectedRoute from '../components/ProtectedRoute'
import TechView from '../views/TechView'
import WarehouseLoadAnalyticsView from '../views/WarehouseLoadAnalyticsView'
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
        path: ROUTES.ANALYTICS,
        element: (
          <ProtectedRoute allowedRoles={['admin', 'pharmacist']}>
            <WarehouseLoadAnalyticsView />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.REPAIR,
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <RepairView />
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
