import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from '@/Pages/Home'
import { NotFound } from '@/Pages/NotFound'

export default function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
      index: true,
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ])

  return <RouterProvider router={router} />
}
