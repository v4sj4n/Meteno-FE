import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import Home from '@/Pages/Home'
import NotFound from '@/Pages/NotFound'
import SignUp from './Pages/Authentication/SignUp'
import SignIn from './Pages/Authentication/SignIn'
import Dashboard from './Pages/Dashboard'
import { ProtectedRoute } from './Components/ProtectedRoute'
import { Navbar } from './Components/Navbar'

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}
export default function Router() {
  const router = createBrowserRouter([
    {
      // path: "/"
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home />,
          index: true,
        },
        {
          path: '/auth/sign-up',
          element: <SignUp />,
        },
        {
          path: '/auth/sign-in',
          element: <SignIn />,
        },
        {
          path: '/dashboard',
          element: <ProtectedRoute children={<Dashboard />} />,
        },
        {
          path: '*',
          element: <NotFound />,
        },
      ],
    },
  ])

  return <RouterProvider router={router} />
}
