import { createBrowserRouter } from 'react-router'
import React from 'react'
import routerPaths from './routerPaths'

const router = createBrowserRouter([
  {
    path: routerPaths.main,
    element: React.createElement('div', null, 'Hello World'),
  },
])

export { routerPaths }
export default router
