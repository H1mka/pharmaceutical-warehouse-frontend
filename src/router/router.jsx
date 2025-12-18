import { createBrowserRouter } from 'react-router'
import { ROUTES } from '@/router/routes'
import MainView from '@/views/MainView'
import MainLayout from '@/layouts/MainLayout'

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [{ path: ROUTES.HOME, element: <MainView /> }],
  },
])

export { ROUTES }
export default router
