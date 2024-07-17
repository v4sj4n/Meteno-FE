import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from '@/Pages/Home'
import { NotFound } from '@/Pages/NotFound'
import { SignUp } from './Pages/Authentication/SignUp'

export default function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
      index: true,
    },
    {
      path: '/auth/signup',
      element: <SignUp />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ])

  return <RouterProvider router={router} />
}
