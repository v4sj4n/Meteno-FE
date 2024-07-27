import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import Home from '@/Pages/Home'
import NotFound from '@/Pages/NotFound'
import SignUp from './Pages/Authentication/SignUp'
import SignIn from './Pages/Authentication/SignIn'
import Dashboard from './Pages/Dashboard'
import { ProtectedRoute } from './Components/ProtectedRoute'
import { Navbar } from './Components/Navbar'
import UserProfile from './Pages/User/UserProfile'
import { ChangePassword } from './Pages/User/ChangePassword'

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
          path: '/my-profile',
          element: <ProtectedRoute children={<UserProfile />} />,
        },
        {
          path: '/change-password',
          element: <ProtectedRoute children={<ChangePassword />} />,
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
